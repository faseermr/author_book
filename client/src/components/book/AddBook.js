import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { Box, Typography } from "@material-ui/core";
import authorServices from "../../services/authorServices";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // flexWrap: "wrap",
    width: 800,
    margin: "auto",
  },
  formControl: {
    marginBottom: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 600,
  },
  select: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 600,
  },
  button: {
    marginLeft: theme.spacing(1),
  },
}));

const AddBook = () => {
  const classes = useStyles();
  const [authorList, setAuthorList] = useState([]);

  // get all author list
  const getAllAuthors = async () => {
    const res = await authorServices.getAllAuthors();
    setAuthorList(res.data);
    //console.log(authorList);
  };

  useEffect(() => {
    getAllAuthors();
  }, []);

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h4" color="textSecondary">
          Add Book
        </Typography>

        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            id="outlined-full-width"
            label="Book"
            style={{ margin: 8 }}
            placeholder="Enter Book Name"
            className={classes.textField}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Author</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Age"
            className={classes.select}
          >
            <MenuItem value="">
              <em>-- Select --</em>
            </MenuItem>
            {authorList.map((val, idx) => {
              return <MenuItem value={val.name}>{val.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
