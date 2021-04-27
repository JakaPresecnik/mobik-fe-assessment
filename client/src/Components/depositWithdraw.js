import swal from 'sweetalert';

const postToServer = async (url = '', data = {}) => {
    const res = await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await res.json();
        console.log('newData', newData);
        return newData;
      }catch(err) {
        swal({text: 'Error', icon: 'warning'});
      }
}

function withdraw (e, acc) {
    e.preventDefault()

    swal("Enter the amount to withdraw",{
        content: {
            element: "input",
            attributes: {
                placeholder: "Type the amount....",
                type: "number",
            }    
        },
        buttons: ["Cancel", "Withdraw"]
    }).then((val) => {
        if (val > 0) {
            swal({
                text: `Do you want to withdraw ${val} from ${acc} account?`,
                icon: "info",
                buttons: {cancel: "cancel", confirm: "Yes"}
            }).then(result => {
                if (result === true) {
                    postToServer('/api/withdraw', {amount: val, account: acc})
                    .then(swal({
                        text: "Success!",
                        icon: "success"
                    }))
                }else {
                    swal({
                        text: "Canceled!",
                        icon: "warning"
                    })
                }
            })
        }else {
            swal({
                text: "Canceled!",
                icon: "warning"
            })
        }
    })
}

function deposit (e, acc) {
    e.preventDefault()

    swal("Enter the amount to deposit",{
        content: {
            element: "input",
            attributes: {
                placeholder: "Type the amount....",
                type: "number",
            }    
        },
        buttons: ["Cancel", "Deposit"]
    }).then((val) => {
        if (val > 0) {
            swal({
                text: `Do you want to deposit ${val} to ${acc} account?`,
                icon: "info",
                buttons: {cancel: "cancel", confirm: "Yes"}
            }).then(result => {
                if (result === true) {
                    postToServer('/api/deposit', {amount: val, account: acc})
                    .then(swal({
                        text: "Success!",
                        icon: "success"
                    }))
                }else {
                    swal({
                        text: "Canceled!",
                        icon: "warning"
                    })
                }
            })
        }else {
            swal({
                text: "Canceled!",
                icon: "warning"
            })
        }
    })
}

export { withdraw, deposit };