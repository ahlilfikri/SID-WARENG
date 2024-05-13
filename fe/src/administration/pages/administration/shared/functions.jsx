const getToken = () => {
    const token = localStorage.getItem('token');
    let id;

    if (token) {
        const parts = token.split('.');
        if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]));
            id = payload.id;
        }
    }
    return id;
    
}


const setDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;

}

export default getToken;
