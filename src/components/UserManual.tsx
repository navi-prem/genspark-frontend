import Link from "next/link";

interface CardProps {
  title: string;
  purpose: string;
  exampleUsage: string;
  howToUse: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, purpose, exampleUsage, howToUse , link }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 hover:underline"><Link href={link}>{title}</Link></h2>
    <p className="text-gray-700 mb-4"><span className="font-bold">Purpose:</span> {purpose}</p>
    <p className="text-gray-700 mb-4"><span className="font-bold">Example Usage:</span> {exampleUsage}</p>
    <p className="text-gray-700"><span className="font-bold">How to Use:</span> {howToUse}</p>
  </div>
);

const ComplianceDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
      <Card
        title="Knowledge Base Upload"
        purpose="This route is for uploading core compliance documents, such as laws, bylaws, rules, and regulations. These documents serve as the foundation of the Knowledge Base, which will later be used to validate other documents."
        exampleUsage="If you have a document containing corporate bylaws, industry regulations, or legal standards, you’d upload it here. This ensures that the Knowledge Base reflects the most accurate and up-to-date standards for compliance checking."
        howToUse="Upload any document you want to include in the Knowledge Base through this route. Both text documents and scanned files are supported. Once uploaded, these files will be available for ingestion in the next step."
        link="/ingest"
      />
      <Card
        title="Knowledge Base Ingestion"
        purpose="This route processes and indexes the uploaded compliance documents into the Knowledge Base (vector database). Ingestion enables the system to retrieve relevant regulations and standards during the validation process."
        exampleUsage="After uploading your company’s code of conduct document through Knowledge Base Upload, you can visit this route to ingest the document. Ingestion will embed the document into the Knowledge Base, making its content searchable and retrievable."
        howToUse="Select the document(s) you’ve uploaded, and proceed with ingestion. Once ingested, the Knowledge Base will be updated, and these documents can be used as references during compliance validation."
        link="/dashboard/kb"
      />
      <Card
        title="Validation Document Upload"
        purpose="This route allows you to upload documents that you want to validate for compliance. Unlike the Knowledge Base Upload, these documents are not regulations but rather documents that need to be checked against the Knowledge Base for compliance."
        exampleUsage="Let’s say you have a new contract, policy, or internal document that you want to check for compliance. You’d upload it here, so the system can prepare it for validation against the regulations stored in the Knowledge Base."
        howToUse="Upload any document you want to validate here. The document will be prepared for validation and stored, ready for the next step where you’ll start the validation process."
        link="/dashboard/rag"
      />
      <Card
        title="Start Validation"
        purpose="This route initiates the validation process for documents uploaded through Validation Document Upload. Here, the system evaluates each document section against the Knowledge Base and provides detailed compliance results."
        exampleUsage="After uploading a new policy document, visit this route to start the validation process. The system will check each part of the document against the stored regulations, flagging any sections that may be non-compliant and providing explanations."
        howToUse="Choose the document you wish to validate and click on 'Start Validation.' The system will generate compliance results for each section, showing whether it aligns with the regulations in the Knowledge Base or requires revision."
        link="/query"
      />
    </div>
  );
};

export default ComplianceDashboard;
