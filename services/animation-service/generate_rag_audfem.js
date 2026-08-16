import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.SARVAM_API_KEY;

if (!API_KEY) {
  throw new Error("SARVAM_API_KEY is missing from your .env file");
}

const OUTPUT_DIR = path.join(
  __dirname,
  "public/assets/audio_rag_female"
);

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const subtitlesList = [


  "Retrieval-Augmented Generation, or RAG, is a technique that improves the capabilities of large language models by connecting them to external knowledge. A normal language model generates answers from the information contained in its training data. RAG adds another step before generation. When a user asks a question, the system searches an external knowledge source, retrieves the most relevant information, and provides that information to the language model. The model can then use this retrieved context to generate a more accurate answer. In simple terms, RAG allows a language model to look up relevant information before answering.",

  "One of the biggest problems with language models is hallucination. When a model does not know the correct answer, it may still generate a response that sounds confident and convincing. The problem is that fluent language does not guarantee factual accuracy. The model may combine patterns from its training data and produce information that is completely incorrect. Retrieval-Augmented Generation helps reduce this problem by providing the model with relevant external context. Instead of forcing the model to rely only on its internal knowledge, RAG gives it evidence that can be used while generating the final response.",

  "Large language models also have another important limitation: a knowledge cutoff. Their training data is collected and processed at a particular point in time. Information created after that point is not automatically known by the model. New events, updated documentation, company policies, recent research, and changing information may therefore be missing. Retraining the entire model every time new information becomes available is extremely expensive and inefficient. RAG solves this problem by keeping external knowledge separate from the model itself. New information can be added to the knowledge base and retrieved whenever the user needs it.",

  "In a traditional question-answering system, the user's question is sent directly to the language model. The model then generates a response using only the knowledge it learned during training. This approach can work well for general topics, but it becomes unreliable when the question depends on private or specialized information. For example, a company may want an assistant that answers questions about internal documents. The language model was never trained on those documents. RAG adds a retrieval step between the user and the model, allowing the system to find relevant information before generating the answer.",

  "The first major stage of a RAG system is document processing. Large documents are usually too big to search or send directly to a language model. Therefore, the system divides them into smaller sections called chunks. When a user asks a question, the retrieval system can search these chunks and return only the most relevant pieces of information. This is more efficient than sending an entire book or document to the model. Good chunking is important because the quality of the retrieved context directly affects the quality of the final answer.",

  "Chunking is more complicated than simply cutting a document after a fixed number of characters. If a chunk is too large, it may contain a lot of irrelevant information and waste valuable context space. If it is too small, important relationships between sentences can be lost. Semantic chunking tries to keep related ideas together based on meaning. Sliding windows can also be used to create overlapping chunks, so important information near the boundary of one chunk is not completely separated from its surrounding context.",

  "After documents are divided into chunks, each chunk is converted into an embedding. An embedding is a numerical representation of the meaning of text. Instead of representing a sentence only as words, an embedding represents it as a vector containing many numerical values. These values capture semantic patterns learned by the embedding model. This allows a computer to compare the meaning of different pieces of text mathematically. Once text has been converted into embeddings, the system can search for content based on meaning rather than depending only on exact words.",

  "Two sentences can use completely different words and still have very similar meanings. For example, one person might ask how to create a database, while another might ask how to build a system for storing structured information. The vocabulary is different, but the underlying idea can be very similar. A good embedding model captures this relationship by placing the two sentences close together in vector space. This is one of the most important ideas behind semantic search. The system is not simply matching words. It is comparing the meaning represented by the text.",

  "The embeddings created from document chunks are stored in a vector database. Vector databases are designed to store and search high-dimensional numerical vectors efficiently. When a user asks a question, the question is also converted into an embedding using the same embedding model. The vector database then compares the query vector with the stored document vectors. The chunks whose vectors are most similar to the query are retrieved as potential answers. This allows the system to search through large collections of documents much faster than manually examining every document.",

  "Traditional databases are generally designed around exact values and keyword matching. If a user searches for a particular word, the database can look for records containing that word. Vector search works differently. It can find information that is conceptually related even when the exact words in the query do not appear inside the document. For example, a query about fixing a broken computer could retrieve a document that discusses troubleshooting hardware problems. The words may be different, but the meaning is related. This is the power of semantic retrieval.",

  "During similarity search, the system compares the embedding of the user's query with the embeddings of many document chunks. Each candidate receives a similarity score. The chunks with higher scores are considered more relevant to the question. The system then selects the best candidates and sends them to the next stage of the pipeline. The quality of this ranking is extremely important. If the correct information is not retrieved, even a powerful language model may produce a poor answer because it does not have the necessary context.",

  "Cosine similarity is one of the most commonly used techniques for comparing embeddings. Instead of focusing only on the absolute size of two vectors, cosine similarity measures the angle between them. If two vectors point in similar directions, their texts are considered semantically similar. If they point in very different directions, the meanings are considered less related. This approach works well for text embeddings because the direction of a vector often represents semantic information. The result is a numerical score that helps the retrieval system rank possible document matches.",

  "Metadata provides additional information about every document chunk. A chunk can contain labels such as its source document, creation date, author, category, topic, or access level. This information can be used before or during the retrieval process. For example, a user may want information only from a particular department or from documents created after a certain date. Metadata filtering can remove irrelevant documents before vector search begins. This improves efficiency and can also improve accuracy because the search is performed over a more relevant collection of information.",

  "There are several different approaches to information retrieval. Dense retrieval uses embeddings to understand the semantic meaning of text. Sparse retrieval focuses more heavily on important keywords and word frequency. Each approach has different strengths. Dense retrieval can understand that different words may express the same idea. Sparse retrieval can be extremely effective when specific technical terms or exact names are important. Hybrid retrieval combines both approaches. By using semantic understanding together with keyword matching, hybrid systems can often retrieve a broader and more relevant set of documents.",

  "Dense retrieval is powerful because it can capture deeper semantic relationships between queries and documents. However, generating embeddings and searching through large vector collections can require significant computational resources. Sparse retrieval is often faster and works very well when the important keywords appear directly in the document. Its weakness is that it may miss relevant information when the same idea is expressed using different words. This is why combining both approaches can be useful. Dense retrieval provides semantic understanding, while sparse retrieval provides strong exact-term matching.",

  "Hybrid search combines the results of dense and sparse retrieval into a single ranking. A query may produce one ranking from vector similarity and another ranking from keyword matching. These results can then be combined using methods such as Reciprocal Rank Fusion. A document that performs well across multiple retrieval methods receives a stronger overall position. This approach improves recall because relevant information can be discovered through different signals. Instead of depending on only one search technique, hybrid retrieval uses multiple perspectives to identify the most useful context.",

  "Retrieval results are not always perfectly ordered. The first result from a vector search may be broadly related to the question but not actually contain the most precise answer. A re-ranker provides another layer of analysis. It examines the query and each candidate document together and calculates a more detailed relevance score. Because the re-ranker evaluates the relationship between the complete query and the complete document, it can identify subtle differences in relevance. The best chunks are then promoted to the top before they are passed to the language model.",

  "Once the most relevant information has been retrieved, it must be given to the language model in a useful format. This is where prompt construction becomes important. A system prompt can instruct the model to use the retrieved context as evidence, answer only when the information is supported, avoid inventing facts, and clearly state when the answer cannot be found. These instructions help connect retrieval with generation. The goal is not simply to give the model more text. The goal is to guide the model toward producing an answer grounded in the retrieved information.",

  "The complete RAG pipeline can now be summarized. First, the user submits a question. The question is converted into an embedding. The system searches a vector database and may also perform keyword search. Relevant document chunks are retrieved and can then be re-ranked for greater precision. The best context is inserted into a carefully designed prompt. Finally, the language model receives the question together with the retrieved information and generates the answer. The full flow is query, embed, retrieve, re-rank, augment, and generate.",

  "RAG makes language models more useful by connecting them to external knowledge. It can improve accuracy because the model receives relevant evidence before answering. It can also make systems more current because the external knowledge base can be updated independently of the language model. In many situations, updating a database is significantly cheaper and faster than retraining a large model. This makes RAG a practical solution for organizations that need an AI assistant to work with changing documents, private company information, technical manuals, or other specialized knowledge.",

  "RAG is powerful, but it is not a perfect solution. Retrieval introduces additional processing time, which can increase latency. Poor chunking can cause important information to be separated or irrelevant information to be retrieved. Language models also have limited context windows, so the system cannot send unlimited amounts of retrieved text. Another problem is stale data. If the knowledge base contains outdated information, the model may still generate an outdated answer. Building a reliable RAG system therefore requires careful attention to data quality, retrieval accuracy, context management, and update strategies.",

  "RAG is already being used in many real-world applications. Customer support assistants can search product documentation and company policies. Legal systems can retrieve relevant regulations, contracts, and case information. Healthcare applications can search specialized medical knowledge. Financial organizations can work with large collections of reports and internal documents. Enterprise search systems can allow employees to ask natural-language questions about company knowledge. Coding assistants can retrieve documentation and code examples. In each case, retrieval gives the language model access to information that may not have been part of its original training data.",

  "The future of RAG is moving beyond simple document search. Agentic systems may decide which sources to search and perform multiple retrieval steps while reasoning through a complex problem. Multimodal retrieval can search across text, images, audio, and video. Knowledge graphs can represent relationships between entities and concepts. Future systems may also evaluate their own retrieval quality and improve their pipelines over time. These developments could make RAG systems more intelligent, more flexible, and better able to work with complex real-world knowledge.",

  "Retrieval-Augmented Generation connects language models with information that exists outside their original training data. The system processes documents, divides them into chunks, converts those chunks into embeddings, stores them in a searchable database, retrieves relevant information, and provides that context to the language model. The model can then generate a response grounded in external evidence. RAG does not eliminate every problem with language models, but it provides a practical way to make them more accurate, current, and useful. That is why RAG has become one of the most important architectures for building real-world AI applications."



];

async function generateAllTTS() {
  console.log(`Generating ${subtitlesList.length} RAG audio files...`);

  for (let i = 0; i < subtitlesList.length; i++) {
    const filename = `step_${i}.wav`;
    const outputPath = path.join(OUTPUT_DIR, filename);

    console.log(`Generating ${filename}...`);

    try {
      const response = await fetch(
        "https://api.sarvam.ai/text-to-speech",
        {
          method: "POST",
          headers: {
            "api-subscription-key": API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            text: subtitlesList[i],
            target_language_code: "en-IN",
            speaker: "kavya",
            model: "bulbul:v3"
          })
        }
      );

      if (!response.ok) {
  const errorBody = await response.text();

  throw new Error(
    `Sarvam API error: ${response.status} ${response.statusText}\n${errorBody}`
  );
}if (!response.ok) {
  const errorBody = await response.text();

  throw new Error(
    `Sarvam API error: ${response.status} ${response.statusText}\n${errorBody}`
  );
}

      const data = await response.json();

      if (!data.audios || !data.audios[0]) {
        throw new Error("No audio returned from Sarvam API");
      }

      const audioBuffer = Buffer.from(
        data.audios[0],
        "base64"
      );

      fs.writeFileSync(
        outputPath,
        audioBuffer
      );

      console.log(`Saved: ${filename}`);

      // Prevent API rate-limit problems
      await new Promise(resolve =>
        setTimeout(resolve, 500)
      );

    } catch (error) {
      console.error(
        `Failed to generate ${filename}:`,
        error.message
      );

      process.exit(1);
    }
  }

  console.log(
    "\nAll RAG audio files generated successfully."
  );
}

generateAllTTS();