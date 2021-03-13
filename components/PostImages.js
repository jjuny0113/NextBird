import React, { useState, useCallback } from "react";
import Proptypes from "prop-types";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import ImagesZoom from "./ImagesZoom/index";

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <img
          role="presentation"
          style={{ display: "inline-block", width: "50%" }}
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          role="presentation"
          style={{ display: "inline-block", width: "50%" }}
          src={images[1].src}
          alt={images[1].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }

  return (
    <>
      <div>
        <img
          role="presentation"
          width="50%"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <MorePicture role="presentation" onClock={onZoom} />
        <PlusOutlined />
        <br />
        {images.length - 1}
        개의 사진 더보기
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.proptypes = {
  images: Proptypes.arrayOf(Proptypes.object),
};

export default PostImages;

const MorePicture = styled.div`
  display: inline-block;
  width: 50%;
  text-align: center;
  vertical-align: middle;
`;
