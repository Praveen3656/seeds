import React from "react";

const Pagination = ({ data,pageHandler, selPageNum}) => {


  let pageNumbers = [];

  for (let i = 1; i < Math.ceil(data.length / 20) + 1; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
    <div className="page">
      <div className="pagebox">
        <center>
          {pageNumbers.map((page, i) => (
            <div className={`pagebutton ${selPageNum===page ? "selpagebg": "" }`}
             onClick={()=>pageHandler(page)}>{page}</div>
          ))}
        </center>
      </div>
      </div>
    </>
  );
};

export default Pagination;
