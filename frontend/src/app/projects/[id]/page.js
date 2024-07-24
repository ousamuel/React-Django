
import ClientProjectPage from "@/components/ClientProjectPage";
export async function generateStaticParams() {
  const DB_HOST = process.env.NEXT_PUBLIC_DB_127;
  const projects = await fetch(`${DB_HOST}/projects/`).then((res) => res.json())

  return projects.map((project) => ({
    id: project.id.toString(), // Ensure the ID is a string
  }));

}


export default function ProjectPage({ params }) {
  const { id } = params;
  return <ClientProjectPage projectId={id} />;
}
