import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Grid } from "@mui/material";
import brandLogo from "../assets/images/brand-logo.png";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { tokens } from "../theme";

export default function RecipeReviewCard() {
  const { theme } = useContext(DataContext);
  const colors = tokens(theme.palette.mode);
  const date = new Date().getUTCFullYear();
  return (
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <Box
        className="shadow-sm"
        backgroundColor={colors.primary[400]}
        overflow="auto"
        sx={{
          border:
            theme.palette.mode === "dark"
              ? `1px solid ${colors.primary[900]}`
              : "",
          borderRadius: "5px",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`1px solid ${colors.primary[900]}`}
          colors={colors.gray[100]}
          p="15px"
        >
          <Typography color={colors.gray[100]} variant="h5" fontWeight="600">
            In recent post
          </Typography>
        </Box>
        <Box p="10px">
          <Card style={{ boxShadow: "none" }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: colors.greenAccent[400] }} aria-label="recipe">
                  C
                </Avatar>
              }
              title="Carbon cell"
              subheader={date}
            />
            <CardMedia
              className="card-img"
              component="img"
              width="100"
              image={brandLogo}
              alt="Carbon Cell"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Grid>
  );
}
