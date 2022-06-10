export function timeSince(timeStamp) {
  const videoTimeStamp = new Date(timeStamp);
  var now = new Date(),
    secondsPast = (now.getTime() - videoTimeStamp.getTime()) / 1000;
  if (secondsPast < 60) {
    return secondsPast + " seconds ago";
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + " min ago";
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + " hour ago";
  }
  if (secondsPast <= 2628000) {
    return parseInt(secondsPast / 86400) + " day ago";
  }
  if (secondsPast <= 31536000) {
    return parseInt(secondsPast / 2628000) + " months ago";
  }
  if (secondsPast > 31536000) {
    return parseInt(secondsPast / 31536000) + " years ago";
  }
}

export function videoViews(views) {
  if (views > 1000000) {
    return Math.round(views / 1000000) + "M";
  } else if (views > 1000) {
    return Math.round(views / 1000) + "K";
  }
}
