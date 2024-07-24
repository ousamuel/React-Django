import ClientProfilePage from "@/components/ClientProfilePage";

export async function generateStaticParams() {
  const DB_HOST = process.env.NEXT_PUBLIC_DB;
  const profiles = await fetch(`${DB_HOST}/profiles/`).then((res) => res.json())

  return profiles.map((profile) => ({
    id: profile.id.toString(), // Ensure the ID is a string
  }));

}


export default function ProfilePage({ params }) {
  const { id } = params;
  return <ClientProfilePage profileId={id} />;
}
