function makeGetRequest(path, target) {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        document.getElementById( target ).innerHTML = xhr.responseText;
    }
    xhr.open( "GET", path );
    xhr.send();
}