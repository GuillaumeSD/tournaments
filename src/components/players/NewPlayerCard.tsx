import { useTournament } from "@/contexts/tournamentContext";
import {
  MenuItem,
  Select,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NewPlayerDialog({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [pool, setPool] = useState<number | "">("");
  const { addPlayer } = useTournament();

  const handleAddPlayer = () => {
    if (!addPlayer) throw new Error("Unable to add player");
    if (!name) {
      alert("Le nom du joueur est obligatoire !");
      throw new Error("Player name is invalid");
    }
    if (!pool || pool < 1 || pool > 6) {
      alert("La poule du joueur doit être comprise entre 1 et 6 !");
      throw new Error("Player pool is invalid");
    }
    addPlayer({
      name,
      pool,
      score: 0,
    });
    handleClose();
  };

  const handleClose = () => {
    setName("");
    setPool("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <DialogTitle>Ajouter un joueur</DialogTitle>
      <DialogContent>
        <Typography paragraph>
          {`La poule 1 est considérée comme la poule la plus forte et la poule 6
          la plus faible. Il n'est pas nécessaire d'utiliser toutes les poules
          de 1 à 6, par exemple on pourrait utiliser seulement les poules 1 et
          2.`}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField
              label="Nom"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="dialog-select-label">Poule</InputLabel>
            <Select
              labelId="dialog-select-label"
              id="dialog-select"
              displayEmpty
              input={<OutlinedInput label="Poule" />}
              value={pool}
              onChange={(e) => {
                if (typeof e.target.value === "string") {
                  throw new Error("Invalid value");
                }
                setPool(e.target.value);
              }}
            >
              {[null, 1, 2, 3, 4, 5, 6].map((poule) => (
                <MenuItem value={poule ?? ""} key={poule ?? "empty-val"}>
                  {poule ?? "Poule"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ m: 1 }}>
        <Button
          variant="outlined"
          sx={{ marginRight: 1 }}
          onClick={handleClose}
        >
          Annuler
        </Button>
        <Button
          variant="contained"
          sx={{ marginRight: 0.5 }}
          onClick={handleAddPlayer}
        >
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}