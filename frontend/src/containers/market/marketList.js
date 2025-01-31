import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import {
  fetchMarketItems,
  fetchMarketRentals,
  fetchMarketVehicles,
} from "../../redux/reducers/marketSlice";
import { useDispatch, useSelector } from "react-redux";

import MarketComponent from "../../components/Market/MarketComponent";
import { makeStyles } from "@mui/styles";
import { useTitle } from "../../Hooks/useTitle";

// import {
//   setMarketItems,
//   setMarketRental,
//   setMarketVehicles,
// } from "../../redux/actions/marketItemActions";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    marginTop: "4rem",
    maxWidth: "1500px",
    paddingInline: "0.5rem",
  },
  title: {
    textAlign: "center",
    color: "#0D1F48",
    paddingBottom: "3rem",
  },
  items: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
}));

export default function MarketList() {
  useTitle("市场");
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    marketItems,
    marketVehicles,
    marketRentals,
    fetchMarketItemsStatus,
    fetchMarketRentalsStatus,
    fetchMarketVehiclesStatus,
  } = useSelector((state) => state.market);

  useEffect(() => {
    if (fetchMarketItemsStatus === "idle" || undefined) {
      dispatch(fetchMarketItems());
    }
    if (fetchMarketRentalsStatus === "idle" || undefined) {
      dispatch(fetchMarketRentals());
    }
    if (fetchMarketVehiclesStatus === "idle" || undefined) {
      dispatch(fetchMarketVehicles());
    }
  }, [
    fetchMarketItemsStatus,
    fetchMarketRentalsStatus,
    fetchMarketVehiclesStatus,
    dispatch,
  ]);

  const marketItemRenderList =
    marketItems &&
    marketItems.map((marketItem, marketItemIdx) => {
      return (
        <MarketComponent item={marketItem} type={"item"} key={marketItemIdx} />
      );
    });
  console.log("marketVehicles", marketVehicles);

  const marketVehicleRenderList =
    marketVehicles &&
    marketVehicles.map((marketVehicle, marketVehicleIdx) => {
      return (
        <MarketComponent
          item={marketVehicle}
          type={"vehicle"}
          key={marketVehicleIdx}
        />
      );
    });

  const marketRentalRenderList =
    marketRentals &&
    marketRentals.map((marketRental, marketRentalIdx) => {
      return (
        <MarketComponent
          item={marketRental}
          type={"rental"}
          key={marketRentalIdx}
        />
      );
    });

  return (
    <Box className={classes.root}>
      <Box>
        <Typography variant="h3" className={classes.title}>
          二手商城
        </Typography>
        <Typography variant="h5" className={classes.title}>
          Item
        </Typography>
        <Box className={classes.items}>{marketItemRenderList}</Box>
        <Divider />
        <Typography variant="h5" className={classes.title}>
          汽车
        </Typography>
        <Box className={classes.items}>{marketVehicleRenderList}</Box>
        <Divider />
        <Typography variant="h5" className={classes.title}>
          房屋
        </Typography>
        <Box className={classes.items}>{marketRentalRenderList}</Box>
        <Divider />
      </Box>
    </Box>
  );
}
