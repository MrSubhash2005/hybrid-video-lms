import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

const jobsDb = new Map();

const celebVoiceMap = {
  'shahrukh': 'aditya',
  'deepika': 'shreya',
  'prabhas': 'shubh',
  'alia': 'aruna',
  'ntr': 'shubh',
  'amitabh': 'arvind'
};

app.get('/', (req, res) => {
  try {
    const rootHtml = path.join(process.cwd(), 'public/index.html');
    if (fs.existsSync(rootHtml)) {
      return res.sendFile(rootHtml);
    }
  } catch (e) {
    console.error('File send error:', e);
  }
  return res.json({ name: 'LMS Animation Service CDN API', status: 'healthy', supported_courses: ['git', 'rag', 'explainer', 'dsa'] });
});

app.get('/health', (req, res) => {
  res.json({ name: 'LMS Animation Service CDN API', status: 'healthy', supported_courses: ['git', 'rag', 'explainer', 'dsa'] });
});

app.get('/api/v1/course/jobs/:jobId', (req, res) => {
  const { jobId } = req.params;
  const job = jobsDb.get(jobId);
  if (!job) {
    return res.json({
      job_id: jobId,
      status: 'completed',
      progress: 100,
      output_url: '/outputs/video_rag_female.mp4'
    });
  }
  return res.json(job);
});

app.post('/api/v1/course/generate', (req, res) => {
  const { celebrity, course, gender } = req.body;
  if (!celebrity) {
    return res.status(400).json({ error: 'Missing celebrity name in request body.' });
  }

  const courseKey = (course || 'rag').toLowerCase();
  let targetGender = (gender && gender !== 'auto') ? gender : null;
  if (!targetGender || (targetGender !== 'male' && targetGender !== 'female')) {
    const femaleKeywords = [
      'deepika', 'priyanka', 'katrina', 'alia', 'madhuri', 'kareena', 'shraddha', 'rashmika',
      'nayanthara', 'aruna', 'shreya', 'kiara', 'samantha', 'kriti', 'anushka', 'tabu', 'kajol',
      'taapsee', 'trisha', 'tamannaah', 'tamanna', 'disha', 'jacqueline', 'shruti', 'janhvi',
      'sara', 'ananya', 'suhana', 'sonam', 'sonakshi', 'pooja', 'aditi', 'radhika', 'yami',
      'bhumi', 'mrunal', 'huma', 'vidya', 'shilpa', 'karisma', 'juhi', 'raveena', 'sridevi',
      'rekha', 'hema', 'jaya', 'taylor', 'beyonce', 'rihanna', 'ariana', 'selena', 'billie',
      'dua', 'katy', 'adele', 'madonna', 'britney', 'shakira', 'jennifer', 'scarlett', 'emma',
      'margot', 'female', 'woman', 'lady', 'girl', 'actress'
    ];
    const norm = celebrity.toLowerCase();
    const clean = norm.replace(/[^a-z]/g, '');
    const isFemaleName = femaleKeywords.some(k => norm.includes(k));
    const isFemaleSuffix = ['a', 'i', 'ee', 'ie', 'ya', 'ina', 'ika', 'ita', 'isha', 'iti'].some(suf => clean.split(' ')[0].endsWith(suf));
    const isMaleException = ['rama', 'krishna', 'surya', 'bala', 'rana', 'mustafa'].some(ex => clean.includes(ex));
    
    targetGender = (isFemaleName || (isFemaleSuffix && !isMaleException)) ? 'female' : 'male';
  }

  const normCeleb = celebrity.toLowerCase().replace(/[^a-z]/g, '');
  const speaker = celebVoiceMap[normCeleb] || (targetGender === 'female' ? 'shreya' : 'aditya');

  const jobId = `job_${Math.random().toString(36).substring(2, 10)}`;
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const outputUrl = `/outputs/video_${courseKey}_${targetGender}.mp4`;

  const job = {
    job_id: jobId,
    status: 'completed',
    course: courseKey,
    celebrity,
    gender: targetGender,
    speaker,
    progress: 100,
    base_url: baseUrl,
    output_url: outputUrl,
    cdn_stream_url: `${baseUrl}${outputUrl}`,
    check_status_url: `/api/v1/course/jobs/${jobId}`,
    message: `Pre-rendered CDN video for '${courseKey}' (${targetGender}) loaded.`
  };

  jobsDb.set(jobId, job);
  return res.status(200).json(job);
});

export default app;
