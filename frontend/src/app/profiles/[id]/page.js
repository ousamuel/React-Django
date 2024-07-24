import ClientProfilePage from "@/components/ClientProfilePage";
import axios from "axios";
export async function generateStaticParams() {
  const DB_HOST = process.env.NEXT_PUBLIC_DB_127;
  try {
    // const profiles = await axios.get(`${DB_HOST}/profiles/`);
    const profiles = await axios.get(`http://ec2-52-15-203-120.us-east-2.compute.amazonaws.com/api/profiles/`);
    return profiles.data.map((profile) => ({
      id: profile.id.toString(), // Ensure the ID is a string
    }));
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return [];
  }
}

export default function ProfilePage({ params }) {
  const { id } = params;
  return <ClientProfilePage profileId={id} />;
}
