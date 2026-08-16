// LMS Video API Sandbox & Documentation Script

let pollInterval = null;

async function handleGenerate(event) {
  event.preventDefault();

  const course = document.getElementById('course-select').value;
  const celebrity = document.getElementById('celebrity-input').value.trim();
  const gender = document.getElementById('gender-select').value;

  if (!celebrity) {
    alert('Please enter a celebrity name.');
    return;
  }

  const submitBtn = document.getElementById('submit-btn');
  submitBtn.disabled = true;

  showState('preview-loading');
  updateLoading('Initializing render job...', '0%');

  try {
    const response = await fetch('/api/v1/course/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ course, celebrity, gender })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${response.status}`);
    }

    const job = await response.json();

    if (job.status === 'completed') {
      updateLoading('Cache hit! Loading video...', '100%');
      setTimeout(() => {
        loadVideoPlayer(job);
        submitBtn.disabled = false;
      }, 400);
    } else {
      pollJobStatus(job.job_id);
    }
  } catch (err) {
    submitBtn.disabled = false;
    alert(`Error: ${err.message}`);
    showState('preview-placeholder');
  }
}

function pollJobStatus(jobId) {
  if (pollInterval) clearInterval(pollInterval);

  pollInterval = setInterval(async () => {
    try {
      const response = await fetch(`/api/v1/course/jobs/${jobId}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const job = await response.json();

      if (job.status === 'completed') {
        clearInterval(pollInterval);
        pollInterval = null;
        updateLoading('Completed! Loading player...', '100%');
        setTimeout(() => {
          loadVideoPlayer(job);
          document.getElementById('submit-btn').disabled = false;
        }, 500);
      } else if (job.status === 'failed') {
        clearInterval(pollInterval);
        pollInterval = null;
        alert(`Render Error: ${job.error || 'Pipeline error'}`);
        showState('preview-placeholder');
        document.getElementById('submit-btn').disabled = false;
      } else {
        updateLoading(getReadableStatus(job.status), `${job.progress || 10}%`);
      }
    } catch (err) {
      console.warn('Poll error:', err);
    }
  }, 1500);
}

function getReadableStatus(status) {
  switch (status) {
    case 'queued': return 'Queued in pipeline...';
    case 'generating_audio': return 'Generating narration audio...';
    case 'probing_durations': return 'Calculating timeline...';
    case 'rendering_frames': return 'Rendering layout frames...';
    case 'compiling_video': return 'Compiling video...';
    case 'multiplexing': return 'Multiplexing tracks...';
    default: return 'Processing...';
  }
}

function updateLoading(statusMsg, pct) {
  document.getElementById('loading-status').textContent = statusMsg;
  document.getElementById('loading-pct').textContent = pct;
}

function loadVideoPlayer(job) {
  showState('preview-player');

  const videoElement = document.getElementById('video-player');
  const fullUrl = `${window.location.origin}${job.output_url}`;

  videoElement.src = job.output_url;
  videoElement.load();

  document.getElementById('cdn-url-field').value = fullUrl;

  const downloadLink = document.getElementById('download-link');
  downloadLink.href = job.output_url;
  downloadLink.setAttribute('download', `video_${job.course}_${job.celebrity || 'narrator'}.mp4`);
}

function showState(stateId) {
  document.getElementById('preview-placeholder').style.display = 'none';
  document.getElementById('preview-loading').style.display = 'none';
  document.getElementById('preview-player').style.display = 'none';

  const target = document.getElementById(stateId);
  if (target) target.style.display = 'block';
}

function resetSandbox() {
  if (pollInterval) {
    clearInterval(pollInterval);
    pollInterval = null;
  }

  const videoElement = document.getElementById('video-player');
  if (videoElement) {
    videoElement.pause();
    videoElement.src = '';
  }

  document.getElementById('submit-btn').disabled = false;
  showState('preview-placeholder');
}

function copyCdnUrl() {
  const field = document.getElementById('cdn-url-field');
  if (!field || !field.value) return;

  navigator.clipboard.writeText(field.value).then(() => {
    const toast = document.getElementById('toast');
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 2000);
  }).catch(() => alert('Copy failed.'));
}

function switchCodeTab(lang) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');

  event.target.classList.add('active');
  const target = document.getElementById(`code-${lang}`);
  if (target) target.style.display = 'block';
}
