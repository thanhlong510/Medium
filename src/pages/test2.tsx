import { api } from "~/utils/api";
import UploadFile from "./components/UploadFile";



export default function Home() {
  const {data:a} =  api.profile.getBio.useQuery({
    userId:"clrnpelmp00002i64tnml5r46"
  })
  console.log(a?.avatarImage)
  const b = api.profile.createBio.useMutation()
  const handleMutate =()=>{
    b.mutate({
      bio:'xin chao tat ca moi nguoi',
      userId:'clsjs2hja0000dwrok70l5qc4'
    })
  }
 
    return (
      <div className='mt-[100px]'>
        <button onClick={handleMutate}>
          Xin chao
        </button>
      <UploadFile />
      </div>
 
    )
}
