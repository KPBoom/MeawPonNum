import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  Container,
  Grid2,
  Card,
  CardMedia,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Modal, // Import Modal
  Box, // Import Box
  useMediaQuery, // Import useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"; // ตัวอย่าง icon
import menuData from "./Data/MenuData.json";
import "./App.css";

function App() {
  const [menu, setMenu] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [openContactModal, setOpenContactModal] = useState(false); // State สำหรับ Modal
  const isMobile = useMediaQuery("(max-width:600px)"); // ปรับขนาดตามต้องการ

  useEffect(() => {
    setMenu(menuData);
  }, []);

  const filteredMenu =
    selectedType === "all"
      ? menu
      : menu.filter((item) => item.type === selectedType);

  const handleOpenContactModal = () => setOpenContactModal(true); // เปิด Modal
  const handleCloseContactModal = () => setOpenContactModal(false); // ปิด Modal

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant={isMobile ? "h6" : "h5"} // ปรับขนาดตัวอักษร
              component="div"
              sx={{ flexGrow: 1, fontSize: isMobile ? "1rem" : "1.8rem" }} // ปรับขนาดตัวอักษรเพิ่มเติม
            >
              เมนู "แมวพ่นน้ำ"
            </Typography>
            <Button
              color="inherit"
              sx={{ fontSize: isMobile ? "0.8rem" : "1rem" }}
              onClick={() => setSelectedType("all")}
            >
              ทั้งหมด
            </Button>
            <Button
              color="inherit"
              sx={{ fontSize: isMobile ? "0.8rem" : "1rem" }}
              onClick={() => setSelectedType("food")}
            >
              อาหาร
            </Button>
            <Button
              color="inherit"
              sx={{ fontSize: isMobile ? "0.8rem" : "1rem" }}
              onClick={() => setSelectedType("drink")}
            >
              น้ำ
            </Button>
            <Button
              color="inherit"
              sx={{ fontSize: isMobile ? "0.8rem" : "1rem" }}
              onClick={() => setSelectedType("dessert")}
            >
              ขนม
            </Button>
            <IconButton
              color="inherit"
              sx={{ fontSize: isMobile ? "0.8rem" : "1rem" }}
              onClick={handleOpenContactModal}
              aria-label="ติดต่อร้านค้า" // เพิ่ม aria-label สำหรับ accessibility
            >
              <LocalPhoneIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Grid2 container spacing={2} justifyContent="center">
            {filteredMenu.map(
              (
                item // ใช้ filteredMenu
              ) => (
                <Grid2 item xs={12} sm={6} md={4} key={item.id}>
                  <Card sx={{ width: 250, height: 350 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt={item.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                      <Typography variant="body1">{item.price} บาท</Typography>
                    </CardContent>
                  </Card>
                </Grid2>
              )
            )}
          </Grid2>
        </Container>
        {/* Modal ติดต่อร้านค้า */}
        <Modal
          open={openContactModal}
          onClose={handleCloseContactModal}
          aria-labelledby="contact-modal-title"
          aria-describedby="contact-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="contact-modal-title" variant="h6" component="h2">
              ติดต่อร้านค้า
            </Typography>
            <Typography id="contact-modal-description" sx={{ mt: 2 }}>
              Facebook:{" "}
              <a
                href="https://www.facebook.com/smile.ice.5872?locale=th_TH"
                target="_blank"
              >
                แมวพ่นน้ำ
              </a>
              <br />
              ที่อยู่ :
              <a href="https://maps.app.goo.gl/JBBtHAu58pFS12DcA" target="_blank">
               บางเลนซอย 10 ต.บางเลน อ.บางใหญ่ จ.นนทบุรี </a>
              <br />
              เบอร์โทร & Line: 092-259-8886
            </Typography>
          </Box>
        </Modal>
      </div>
    </Router>
  );
}

export default App;
