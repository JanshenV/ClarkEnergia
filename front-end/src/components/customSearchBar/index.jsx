import './styles.css';

export default function CustomSearchBar({
    placeholder,
    searchFunction
}) {
    
    return (
        <div className="searchBar-container">
            <input
                type="text"
                onChange={(event) => searchFunction(event)}
                placeholder={placeholder}
            />
        </div>
    );
};