import React from "react";
import Link from "next/link";


const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v,idx) => {
        if (v.match(/(#[^\s#]+)/g)) {
          return (
            <Link href={`/hashtag/${v.slice(1)}`} key={idx}>
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};



export default PostCardContent;
