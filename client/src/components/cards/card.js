import React from "react";
import "./card-style.css";
import doc from "../../DocTypeImages/doc-icon.png";
import jpeg from "../../DocTypeImages/jpeg-icon.png";
import pdf from "../../DocTypeImages/pdf-icon.png";
import txt from "../../DocTypeImages/txt-icon.png";

export const Card = (props) => {
  let m = props.value.docType;

  // getDocType(){
  //   if(props.value.docType === "doc" )
  //   return doc;
  //   else if(props.value.docType === "jpeg"|| "jpg" )
  //   return jpeg;
  //   else if(props.value.docType === "pdf" )
  //   return pdf;
  //   else
  //   return txt;
  // };
  return (
    <div className="Card">
      <img
        className="image"
        src={m === "doc" ? doc : m === "pdf" ? pdf : jpeg}
      ></img>
      <h4>{props.value.name}</h4>
      <a target="_blank" href={`https://ipfs.io/ipfs/${props.value.docHash}`}>
        click here..
      </a>
    </div>
  );
};
