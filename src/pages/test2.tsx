import { api } from "~/utils/api";
import UploadFile from "./components/UploadFile";



export default function Home() {
  const {data:a} =  api.profile.getBio.useQuery({
    userId:"clrnpelmp00002i64tnml5r46"
  })
  console.log(a?.avatarImage)
    return (
      <div className='mt-[100px]'>
      <UploadFile />
      </div>
 
    )
}
