import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import QualityForm from "../components/ui/qualityForm";
import { useQualities } from "../hooks/useQualities";
import { useHistory } from "react-router";
// import httpService from "../services/http.service";

const EditQualityPage = () => {
  const id = useParams().id;
  const history = useHistory();
  const { getQuality, updateQuality } = useQualities();
  const quality = getQuality(id);
  console.log(quality);

  // const qualityEndPoint = `quality/${id}`;

  // const updateQuality = async (content) => {
  //   try {
  //     const data = await qualityService.update(id, content);
  //     return data.content;
  //   } catch (error) {
  //     const { message } = error.response.data;
  //     // console.log("error", error);
  //     // console.log("message", message);
  //     // console.log("code", code);
  //     toast.error("Ooops... Error... \n" + message);
  //   }
  // };

  // const getQuality = async (id) => {
  //   try {
  //     const data = await qualityService.get(id);
  //     return data.content;
  //   } catch (error) {
  //     const { message } = error.response.data;
  //     toast.error("Ooops... Error... \n" + message);
  //     console.log("Expected Error");
  //   }
  // };

  const handleSubmit = (data) => {
    updateQuality(data).then((data) => {
      if (data) {
        history.push("/");
      }
    });
    console.log("data", data);
  };

  // useEffect(async () => {
  //   getQuality(id).then((data) => setQuality(data));
  // }, []);

  // console.log(quality);
  return (
    <>
      <h1>Edit Quality Page</h1>

      <QualityForm data={quality} onSubmit={handleSubmit} />
    </>
  );
};

export default EditQualityPage;
