import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Component_Style/Title";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Playlist() {
  const classes = useStyles();
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    axios
      .get("/api/playlists")
      .then((response) => {
        console.log("Playlist API response: ", response)
        setPlaylists(response.data.playlists);

      })
      .catch((err) => {
        console.log("api error: ", err);
      });
  }, []);

  return (
    <React.Fragment>
      <div>
      <Title>Playlists</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Playlist</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Last Score</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        {playlists && (
          <TableBody>
            {playlists.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell>{row.created_at.split("T")[0]}</TableCell>
                <TableCell>{`${Math.floor(Math.random() * (100 - 50) + 50)}%`}</TableCell>
                <TableCell>
                  <Link
                    to={{
                      pathname: `/playlists/quiz/${row.name}`,
                      state: {
                        is_playlist: true,
                      },
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="outlined" color="primary">
                      Test
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Create a Playlist
        </Link>
      </div>
      </div>
    </React.Fragment>
  );
}
