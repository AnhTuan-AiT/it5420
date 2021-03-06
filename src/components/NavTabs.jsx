import Box from "@material-ui/core/Box";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

const StyledTabs = withStyles({
  root: { background: "#1a7900" },
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginBottom: 6,
    "& > span": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: "#fff",
    },
  },
})((props) => (
  <Tabs {...props} centered TabIndicatorProps={{ children: <span /> }} />
));

const LinkTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: "#fff",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple component={NavLink} {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    zIndex: 10,
  },
}));

export const tabs = {
  Mới: "/",
  "Thế giới": "/world",
  "Kinh tế": "/economy",
  "Giáo dục": "/education",
  "Giải trí": "/entertainment",
  "Thể thao": "/sport",
};

const arrTabs = Object.entries(tabs);

export default function NavTabs() {
  const classes = useStyles();

  //
  const location = useLocation();
  // const ref = useRef();

  //
  window.onscroll = function () {
    const nav = document.getElementById("nav");

    if (window.pageYOffset > 80) {
      if (nav) {
        nav.style.position = "fixed";
        nav.style.width = "100%";
        nav.style.background = "rgba( 255, 255, 255, 0.25 )";
        nav.style.backdropFilter = "blur( 4px )";
      }
    } else {
      if (nav) {
        nav.style.position = null;
        nav.style.width = null;
        nav.style.background = null;
        nav.style.backdropFilter = null;
      }
    }
  };

  useEffect(() => {
    // Fixed bug: indicator not show in the first load.
    window.dispatchEvent(new CustomEvent("resize"));
  }, [location.pathname]);

  return (
    <div className={classes.root} id="nav">
      <StyledTabs value={location.pathname} aria-label="styled tabs example">
        {arrTabs.map((tab, index) => (
          <LinkTab
            key={tab[1]}
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={tab[0]}
            to={tab[1]}
            value={tab[1]}
            {...a11yProps(index)}
          />
        ))}
      </StyledTabs>
    </div>
  );
}
