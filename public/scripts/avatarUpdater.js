let eyes = document.getElementById('EyeDropdown');
let nose = document.getElementById('NoseDropdown');
let mouth = document.getElementById('MouthDropdown');
let color = document.getElementById('AvatarColor');
let picture = document.getElementById('userPic');
let url;
if (eyes.options[eyes.selectedIndex].value && nose.options[nose.selectedIndex].value && mouth.options[mouth.selectedIndex].value && color.value && color.value.substring(1))
    url = `https://api.adorable.io/avatars/face/${eyes.options[eyes.selectedIndex].value}/${nose.options[nose.selectedIndex].value}/${mouth.options[mouth.selectedIndex].value}/${color.value.substring(1)}`;
else
    url = "https://api.adorable.io/avatars/face/eyes1/nose2/mouth1/ffffff";

switch (eyes.options[eyes.selectedIndex].value)
{
    case 'eyes1':
        eyes.options[eyes.selectedIndex].innerHTML = "Oval";
        break;
    case 'eyes2':
        eyes.options[eyes.selectedIndex].innerHTML = "Saggy";
        break;
    case 'eyes3':
        eyes.options[eyes.selectedIndex].innerHTML = "Close Hole";
        break;
    case 'eyes4':
        eyes.options[eyes.selectedIndex].innerHTML = "Far Hole";
        break;
    case 'eyes5':
        eyes.options[eyes.selectedIndex].innerHTML = "Happy Arcs";
        break;
    case 'eyes6':
        eyes.options[eyes.selectedIndex].innerHTML = "Large Saggy";
        break;
    case 'eyes7':
        eyes.options[eyes.selectedIndex].innerHTML = "Big Sad";
        break;
    case 'eyes9':
        eyes.options[eyes.selectedIndex].innerHTML = "Angled Oval";
        break;
}

switch (nose.options[nose.selectedIndex].value)
{
    case 'nose2':
        nose.options[nose.selectedIndex].innerHTML = "Slanted";
        break;
    case 'nose3':
        nose.options[nose.selectedIndex].innerHTML = "Stout";
        break;
    case 'nose4':
        nose.options[nose.selectedIndex].innerHTML = "High";
        break;
    case 'nose5':
        nose.options[nose.selectedIndex].innerHTML = "Fat";
        break;
    case 'nose6':
        nose.options[nose.selectedIndex].innerHTML = "Tall";
        break;
    case 'nose7':
        nose.options[nose.selectedIndex].innerHTML = "Short";
        break;
    case 'nose8':
        nose.options[nose.selectedIndex].innerHTML = "Lengthy";
        break;
    case 'nose9':
        nose.options[nose.selectedIndex].innerHTML = "Large";
        break;
}

switch (mouth.options[mouth.selectedIndex].value)
{
    case 'mouth1':
        mouth.options[mouth.selectedIndex].innerHTML = "Straight Line";
        break;
    case 'mouth3':
        mouth.options[mouth.selectedIndex].innerHTML = "Puckered Lips";
        break;
    case 'mouth5':
        mouth.options[mouth.selectedIndex].innerHTML = "Open";
        break;
    case 'mouth6':
        mouth.options[mouth.selectedIndex].innerHTML = "Rectangle";
        break;
    case 'mouth7':
        mouth.options[mouth.selectedIndex].innerHTML = "Large Saggy Oval";
        break;
    case 'mouth9':
        mouth.options[mouth.selectedIndex].innerHTML = "Medium Happy";
        break;
    case 'mouth10':
        mouth.options[mouth.selectedIndex].innerHTML = " Sideways Mouth";
        break;
    case 'mouth11':
        mouth.options[mouth.selectedIndex].innerHTML = " Large Happy";
        break;
}

const handleChange = evt =>
{
    url = `https://api.adorable.io/avatars/face/${eyes.options[eyes.selectedIndex].value}/${nose.options[nose.selectedIndex].value}/${mouth.options[mouth.selectedIndex].value}/${color.value.substring(1)}`;
    picture.src = url;
}
handleChange();

eyes.addEventListener('change', handleChange);
nose.addEventListener('change', handleChange);
mouth.addEventListener('change', handleChange);
color.addEventListener('change', handleChange);