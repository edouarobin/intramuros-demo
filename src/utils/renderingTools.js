import { replace } from 'lodash';

export const formattingTextToHTML = (text: string) => {
  if (!text) return null;

  const emailRegEx = new RegExp(
    /(^|\s)(([A-zÀ-ÿ\d-]+)(\.[A-zÀ-ÿ\d-]+)*@([A-zÀ-ÿ\d-]+)(\.[A-zÀ-ÿ\d-]+)+)/gim
  );
  text = replace(text, emailRegEx, function(match, space, email) {
    console.log(email);
    return space + '<a href="mailto:' + email + '">' + email.trim() + '</a>';
  });

  const phoneNumber = new RegExp(
    /(^|\s)((?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4})/gim
  );
  text = replace(text, phoneNumber, function(match, space, phone) {
    return space + '<a href="tel:' + phone + '">' + phone.trim() + '</a>';
  });

  const hashTagRegEx = new RegExp(/(^|\s)(#[A-zÀ-ÿ\d-]+)/gi);
  text = replace(text, hashTagRegEx, function(match, space, hashtag) {
    var hyperlink = 'https://twitter.com/hashtag/' + hashtag.replace('#', '');
    return space + '<a href="' + hyperlink + '">' + hashtag.trim() + '</a>';
  });

  const arobaseTagRegEx = new RegExp(/(^|\s)(@[A-zÀ-ÿ\d-]+)/gi);
  text = replace(text, arobaseTagRegEx, function(match, space, arobase) {
    var hyperlink = 'https://twitter.com/' + arobase.replace('@', '');
    return space + '<a href="' + hyperlink + '">' + arobase.trim() + '</a>';
  });

  const urlLinkRegex = new RegExp(/(^|\s)(((https?\:\/\/)|(www\.))(\S+))/gm);
  text = replace(text, urlLinkRegex, function(match, space, url) {
    var hyperlink = url;
    if (!hyperlink.match('^https?://')) {
      hyperlink = 'http://' + hyperlink;
    }
    return space + '<a href="' + hyperlink + '">' + url.trim() + '</a>';
  });

  //Supprimer les retours chariots inutiles (car accompagné des balises <br>)
  text = text.replace('<br />\r\n', '<br>');
  text = text.replace('<br/>\r\n', '<br />');

  text = '<div>' + text + '</div>';
  //Amélioration des perfs: on segmente en plusieurs div. Un div passera automatiquement à la ligne
  const newLineRegex = new RegExp(/(\r\n)/gm);
  text = replace(text, newLineRegex, '</div><div>');
  return text;
};
