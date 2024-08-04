"use client";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import {
  Box,
  Modal,
  Typography,
  Stack,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, "pantry"));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setPantry(pantryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }

    await updatePantry();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }

    await updatePantry();
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      bgcolor="#f5f5f5"
      padding={2}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          color="black"
          borderRadius="8px"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                addItem(itemName);
                setItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New Item
      </Button>
      <Typography variant="h2" color="primary" gutterBottom>
        Pantry Tracker
      </Typography>
      <Box
        width="100%"
        maxWidth="800px"
        bgcolor="white"
        borderRadius="8px"
        boxShadow={3}
        padding={2}
        overflow="auto"
      >
        <Stack spacing={2}>
          {pantry.map(({ name, quantity }) => (
            <Card key={name} variant="outlined">
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  {quantity}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addItem(name)}
                  >
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeItem(name)}
                  >
                    Remove
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
