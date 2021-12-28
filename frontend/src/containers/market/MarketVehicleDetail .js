import { Box, Divider, Fab, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  selectMarketItemById,
  selectedMarketItem,
} from "../../redux/slice/marketSlice";
import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "@mui/icons-material/Close"; // import { Loading } from "../../components/Market/loading";
import DetailInfo from "../../components/Market/detailInfo";
// import { Loading } from "../../components/Market/loading";
import SellerInfo from "../../components/Market/sellerInfo";
import SwipeViews from "../../components/SwipeViews";
import TitleInfo from "../../components/titleInfo";
import { detailStyle } from "../../components/Market/marketDetailCss";
import { useHistory } from "react-router";
// import useGetImages from "../../components/Market/useGetImages";
import { useParams } from "react-router-dom";
import useStarter from "../../components/Market/useStarter";
import { useTitle } from "../../Hooks/useTitle";

export function MarketVehicleInfo({ marketItem, mode = "detail", darkTheme }) {
  const [open, setOpen] = useState(false);
  console.log(mode);
  const {
    id,
    // name,
    price,
    description,
    address,
    vehicleType,
    make,
    year,
    model,
    exteriorColor,
    interiorColor,
    fuelType,
    tags,
    user,
    // active,
    createdAt,
    updatedAt,
    // ByCreatedAt,
    contactEmail,
    contactPhone,
    contactWeChat,
    owner,
  } = marketItem;
  return (
    <Paper>
      <TitleInfo
        id={id}
        mode={mode}
        price={price}
        updatedAt={updatedAt}
        owner={owner}
        open={open}
        user={user}
        contactEmail={contactEmail}
        contactPhone={contactPhone}
        contactWeChat={contactWeChat}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
        type="vehicle"
        year={year}
        make={make}
        model={model}
        darkTheme={darkTheme}
      />
      <Divider variant="middle" />
      <DetailInfo
        type="vehicle"
        tags={tags}
        description={description}
        address={address}
        year={year}
        make={make}
        model={model}
        mode={mode}
        vehicleType={vehicleType}
        exteriorColor={exteriorColor}
        interiorColor={interiorColor}
        fuelType={fuelType}
        darkTheme={darkTheme}
      />
      <Divider variant="middle">
        <Typography fontWeight="600">卖家详情</Typography>
      </Divider>
      <SellerInfo
        user={user}
        createdAt={createdAt}
        owner={owner}
        darkTheme={darkTheme}
      />
    </Paper>
  );
}

export default function MarketVehicleDetail() {
  const classes = detailStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  useTitle("二手车辆");
  const { id } = useParams();

  useEffect(() => {
    dispatch(selectedMarketItem(id));
  }, [id, dispatch]);

  const marketItem = useSelector((state) => selectMarketItemById(state, id));
  const { darkTheme } = useSelector((state) => state.general);
  const starter = useStarter(marketItem, "vehicle");
  const closeHandler = () => {
    if (window.history.length > 2) {
      window.history.back();
    } else {
      const currentURL = window.location.href;
      const goURL = currentURL.split("/");
      history.push(`/market/${goURL[goURL.length - 2]}`);
    }
  };
  return (
    <div className={classes.root}>
      {starter === false ? null : (
        <Stack
          direction={{ xs: "column", md: "row" }}
          className={classes.contain}
        >
          <Box
            sx={{
              "& > :not(style)": { m: 1 },
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: 100,
            }}
          >
            <Fab color="primary" onClick={() => closeHandler()}>
              <CloseIcon />
            </Fab>
          </Box>
          <Box className={classes.images}>
            <SwipeViews images={marketItem.imgURLs} />
          </Box>
          <Box className={classes.info}>
            <MarketVehicleInfo marketItem={marketItem} darkTheme={darkTheme} />
          </Box>
        </Stack>
      )}
    </div>
  );
}
