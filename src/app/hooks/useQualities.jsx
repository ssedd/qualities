import React, { useContext, useEffect, useState, useRef } from "react";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";

export const useQualities = () => {
  return useContext(QualitiesContext);
};

const QualitiesContext = React.createContext();

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const prevState = useRef();
  useEffect(() => {
    const getQualities = async () => {
      try {
        const { content } = await qualityService.fetchAll();
        console.log("content", content);
        setQualities(content);
        setLoading(false);
      } catch (error) {
        errorCatcher(error);
      }
    };
    getQualities();
  }, []);

  const getQuality = (id) => {
    return qualities.find((q) => q._id === id);
  };

  const updateQuality = async ({ _id: id, ...data }) => {
    try {
      const { content } = await qualityService.update(id, data);
      setQualities((prevState) =>
        prevState.map((item) => {
          if (item._id === content._id) {
            return content;
          }
          return item;
        })
      );

      return content;
    } catch (error) {
      errorCatcher(error);
    }
  };

  const addQuality = async (data) => {
    try {
      const { content } = await qualityService.create(data);
      setQualities((prevState) => [...prevState, content]);
      return content;
    } catch (error) {
      errorCatcher(error);
    }
  };
  const deleteQuality = async (id) => {
    prevState.current = qualities;
    try {
      const { content } = await qualityService.delete(id);
      setQualities((prevState) => {
        return prevState.filter((item) => item._id !== content._id);
      });
    } catch (error) {
      errorCatcher(error);
    }
  };

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <QualitiesContext.Provider
      value={{ qualities, getQuality, updateQuality, addQuality, deleteQuality }}
    >
      {!isLoading ? children : <h1>Loading...</h1>}
      {console.log("children", children)}
    </QualitiesContext.Provider>
  );
};

// const deleteQuality = async (id) => {
//   prevState.current = qualities;
//   setQualities((prevState) => {
//     return prevState.filter((item) => item._id !== id);
//   });
//   try {
//     await qualityService.delete(id);
//   } catch (error) {
//     const { message } = error.response.data;
//     setError(message);
//     toast("Object not defined", message);
//     setQualities(prevState.current);
//   }
// };
