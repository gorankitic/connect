
// next
import { redirect } from "next/navigation";
// utils
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initialProfile"; 

const SetupPage = async () => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({ 
    where: { 
      members: {
        some: { 
          profileId: profile.id 
        }
      }
    } 
  });

  if(server) {
    return redirect(`/servers/${server.id}`);
  }

  return (
    <p>Create a server</p>
  )
}

export default SetupPage;
