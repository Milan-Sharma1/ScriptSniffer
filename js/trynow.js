const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const pdfview = document.getElementById("pdfview");
var outputContainer = document.getElementById("output-container");

inputFile.addEventListener("change", uploadPdf);

var spinner = function () {
    setTimeout(function () {
        if ($('#spinner').length > 0) {
            $('#spinner').removeClass('show');
        }
    }, 1000);
};
spinner();

// Sticky Navbar
$(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.sticky-top').addClass('shadow-sm').css('top', '0px');
    } else {
        $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
    }
});


function uploadPdf() {
    const file = inputFile.files[0];
    if (file && file.type === "application/pdf") {
        const pdfUrl = URL.createObjectURL(file);
        const elementsToRemove = ['toremove', 'toremove1'];
        elementsToRemove.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.parentNode.removeChild(element);
            }
        });
        const newIframe = document.createElement('iframe');
        newIframe.setAttribute('id', 'pdfview');
        newIframe.setAttribute('frameBorder', '0');
        newIframe.setAttribute('scrolling', 'auto');
        newIframe.style.width = '100%';
        newIframe.style.height = '250px';
        newIframe.style.borderRadius = '20px';
        pdfview.append(newIframe);
        newIframe.src = pdfUrl;
    } else {
        alert("Please select a valid PDF file.");
    }
}


dropArea.addEventListener("dragover", function (e) {
    e.preventDefault();
});

dropArea.addEventListener("drop", function (e) {
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    uploadPdf();
});

function savePdf() {
    $('#spinner').addClass('show');

    const file = inputFile.files[0];
    if (file && file.type === "application/pdf") {
        const formData = new FormData();
        formData.append("pdfFile", file);

        fetch("save_pdf.php", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("PDF saved successfully!");
            } else {
                alert("Failed to save PDF.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to save PDF. Please try again.");
        })
        .finally(() => {
            fetch('../../../../cgi-bin/PyMain/main.py')
            .then(response => response.text())
            .then(data => {
                outputContainer.innerHTML = data;
                deleteFile();
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Failed to fetch data from Python file.");
            })
            .finally(() => {
                $('#spinner').removeClass('show');
            });
        });
    } else {
        alert("No valid PDF file to save.");
        $('#spinner').removeClass('show');
    }
}


function deleteFile() {
    fetch('save_pdf.php', {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log('File deleted successfully');
        } else {
            console.error('Failed to delete file');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Failed to delete file.");
    });
}
