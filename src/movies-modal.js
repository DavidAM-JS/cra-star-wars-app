import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useStyles } from './movies-modal-styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';



const MoviesModal = ({ movie }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const handleModalOpen = () => { setModalOpen(true) }

    const handleModalClose = () => { setModalOpen(false) }

    const getCharacters = () => {
        return movie.characters.map((character) => axios.get(character));
    }

    const loadCharacters = () => {
        Promise.all(getCharacters()).then((data) => {
            console.log(data);
            setCharacters(data.map((character) => character.data));
            setLoading(true);
        });
    };

    useEffect(() => {
        if (modalOpen) {
            loadCharacters();
        }
    }, [modalOpen]);

    const classes = useStyles();

    return (
            <div>
                <Button 
                style={{margin: "20px"}}
                variant="contained"
                color="primary"
                size="small"
                onClick={handleModalOpen}>See Details
                </Button>
                <Modal
                    className={classes.modal}
                    open={modalOpen}
                    onClose={handleModalClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    {
                        <div className={classes.paper}>
                            <h1 style={{textAlign: "center"}} id="simple-modal-title">{movie.title}</h1>
                            <h3 style={{textAlign: "center"}}>Directed by: <p style={{display: "inline-block", fontWeight: "lighter"}}>{movie.director}</p></h3>
                            <h3 style={{textAlign: "center"}}>Produced by: <p style={{marginTop: "0", display: "inline-block", fontWeight: "lighter"}}>{movie.producer}</p></h3>
                            <p>{movie.opening_crawl}</p>
                            <h2 style={{textAlign: "center"}}>Characters</h2>
                            <div style={{display:"flex", flexWrap: "wrap", justifyContent:"center"}}>
                                {
                                    isLoading ?
                                        characters.map((character) => <p style={{margin: "20px"}} className="characters" key={`${movie.id}-${character.name}`}>{character.name}</p>)
                                        : <p>Loading characters...</p>
                                }
                            </div>
                        </div>
                    }
                </Modal>
            </div>
    )
}

export default MoviesModal;