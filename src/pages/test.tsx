import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";

const Test = () => {
  // const { data: session } = useSession();
  // const [imgURL, setURL] = useState<string>(''); // Khai báo kiểu cho useState

  // const { data: a } = api.post.sendData.useQuery({
  //   fileName: "matsaucmnd.jpg",
  // });

  // const { data: b } = api.post.getData.useQuery({
  //   fileName: "matsaucmnd.jpg",
  // });

  // useEffect(() => {
  //   if (b) {
  //     setURL(a ? a[0] : ''); // Kiểm tra và sử dụng a[0] nếu a không phải là undefined
  //   } else {
  //     setURL(session?.user.image || '');
  //   }
  // }, [a, b, session]);

  return (
    <div>
      
    </div>
  );
};

export default Test;
