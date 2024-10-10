const form =document.querySelector('#CoinSearchForm');
const res=document.querySelector('#tableResult');
const cont=document.getElementById("allContaint");
var upd;
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(upd){
        clearTimeout(upd);
    }
    const ctype=form.elements.CoinType.value;
    cont.classList.add('mainClick');
    cont.classList.remove('main');
    getPrice(ctype);
})
const getPrice=async(ctype)=>{
    const options = {method: 'GET', headers: {accept: 'application/json','X-API-KEY': 'cTBv6aBWKBpHvh12tV7Wta0WMCjCEv833AnbsBywsD4='}};
    //axois to fetch data from server through  api 
    const details=await axios.get(`https://openapiv1.coinstats.app/coins/${ctype}?currency=USD`,options);
    // console.log(details);
    const price=details.data.price;
    const volume=details.data.volume;
    const change=details.data.priceChange1d;
    const base=details.data.name;
    // console.log(base);
    const target='USD';
    var color="green";
    if(change<0){
        color="red";
    }

    res.innerHTML=`<tr class="bg-primary" style="color:white;">
    <td>Property</td>
    <td>Value</td>
</tr>
<tr>
    <td>
        ${base}
    </td>
    <td style="color:${color};"><span style="font-size:1.3em;">
    ${price}
    </span>
    ${target}
    </td>
</tr>
<tr>
    <td>
        Volume(24 hrs)
    </td>
    <td>
      ${volume}
    </td>
</tr>
<tr>
    <td>
        Change(24 hrs)
    </td>
    <td style="color:${color};">
        ${change} ${target}
    </td>
</tr>`;
upd=setTimeout(()=>getPrice(ctype),10000);
}
