import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import BookIcon from '@material-ui/icons/Book';
import EventNoteIcon from '@material-ui/icons/EventNote';
import WebIcon from '@material-ui/icons/Web';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import RateReviewIcon from '@material-ui/icons/RateReview';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import ContactMailIcon from '@material-ui/icons/ContactMail';

export const MenuItems = [
    {
        name: "profile",
        link: "/user",
        icon: <PersonIcon color="secondary"  />
    },{
        name: "sign in",
        link: "/auth",
        icon: <LockOpenIcon color="secondary" />
    },{
        name: "sign up",
        link: "/auth/signup",
        icon: <HowToRegIcon color="secondary" />
    },{
        name: "blog",
        link: "/blog",
        icon: <BookIcon color="secondary" />
    },{
        name: "events",
        link: "/events",
        icon: <EventNoteIcon color="secondary" />
    },{
        name: "webinars",
        link: "/webinar",
        icon: <WebIcon color="secondary" />
    },{
        name: "our company",
        link: "/about",
        icon: <GroupWorkIcon color="secondary" />
    },{
        name: "reviews",
        link: "/reviews",
        icon: <RateReviewIcon color="secondary" />
    },{
        name: "resources",
        link: "/resources",
        icon: <AspectRatioIcon color="secondary" />
    },{
        name: "contact us",
        link: "/contact",
        icon: <ContactMailIcon color="secondary" />
    },{
        name: "sign out",
        link: "/auth/signout",
        icon: <ExitToAppIcon color="secondary" />
    },
];