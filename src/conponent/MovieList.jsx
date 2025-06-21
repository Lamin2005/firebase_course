import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase_config";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import "./MovieList.css";

let MovieList = () => {
  let [movie, setMovie] = useState([]);
  let movieConnection = collection(db, "movies");
  let [loading, setLoading] = useState(true);
  let [mname, setMname] = useState("");
  let [mdate, setMdate] = useState("");
  let [updateTitle, setUpdateTitle] = useState("");
  let [oscar, setOscar] = useState(false);
  let [online, setOnline] = useState(navigator.onLine);

  let getMovie = async () => {
    try {
      setLoading(true);
      let data = await getDocs(movieConnection);
      console.log("Successfully data.");
      console.log(data);
      let filterdata = data.docs.map((docs) => ({
        ...docs.data(),
        id: docs.id,
      }));
      console.log(filterdata);
      setMovie(filterdata);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getMovie();
  }, [online]);

  useEffect(() => {
    let handleOnline = () => setOnline(true);
    let handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  console.log(movie);

  let handleSubmit = async () => {
    if (mname === "" && mdate === "") {
      return;
    }
    try {
      await addDoc(movieConnection, {
        title: mname,
        releaseDate: mdate,
        OScar: oscar,
        userID: auth?.currentUser?.uid
      });
      getMovie();
      setMname("");
      setMdate("");
      setOscar(false);
      console.log("Successfully Add Movie.");
    } catch (error) {
      console.log("Error", error);
    }
  };

  let deleteMovie = async (id) => {
    try {
     
      let deletemoviecon = doc(db, "movies", id);
      await deleteDoc(deletemoviecon);
      console.log("Successfully Delete Movie.");
      getMovie();
    } catch (error) {
      console.log("Fail to Delete Error", error);
    }
  };

  let updateMovie = async (id) => {
    if (updateTitle === "") {
      return;
    }
    try {
      setLoading(true);
      let updatemoviecon = doc(db, "movies", id);
      await updateDoc(updatemoviecon, { title: updateTitle });
      console.log("Successfully Update Movie.");
      getMovie();
      setUpdateTitle("");
    } catch (error) {
      console.log("Fail to Delete Error", error);
    }
  };

  return (
    <section>
      <h1 style={{ textAlign: "center" }}>Movie List</h1>
      <div className="form" style={{ margin: "1rem" }}>
        <input
          type="text"
          placeholder="Enter Movie Title..."
          value={mname}
          onChange={(e) => setMname(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Movie Release Date..."
          value={mdate}
          onChange={(e) => setMdate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          id="chekbox"
          checked={oscar}
          onChange={(e) => setOscar(e.target.value)}
        />
        <label htmlFor="chekbox">GetOscar</label>
        <button onClick={handleSubmit}>Add Movie</button>
      </div>
      <div className="movielist">
        {!online ? (
          "Please Open Internet..."
        ) : (
          <>
            {!loading ? (
              <>
                {movie.map((movie) => {
                  return (
                    <div className="movie" key={movie.id}>
                      <h2>Title :{movie.title}</h2>
                      <p>Date : {movie.releaseDate}</p>
                      <p>{movie.OScar ? "Get Oscar" : "No Oscar"}</p>
                      <input
                        type="text"
                        placeholder="Edit Your Title..."
                        value={updateTitle}
                        onChange={(e) => setUpdateTitle(e.target.value)}
                      />
                      <button onClick={() => updateMovie(movie.id)}>
                        Update Movie Tiltle
                      </button>
                      <button onClick={() => deleteMovie(movie.id)}>
                        Delete Movie
                      </button>
                    </div>
                  );
                })}
              </>
            ) : (
              "Loading Movie data..."
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default MovieList;
