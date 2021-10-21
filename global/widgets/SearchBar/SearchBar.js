import React from 'react';
import {InputField} from "../../global";
import SearchIcon from '@mui/icons-material/Search';
import {SearchBarStyles} from "./SearchBarStyles";

const SearchBar = (props) => {
    const {handleSearch, title} = props;
    const styles = SearchBarStyles();

    return (
        <InputField
            label={title}
            className={styles.searchInput}
            inputIcon={<SearchIcon />}
            onChange={handleSearch}
        />
    );
};

export default SearchBar;