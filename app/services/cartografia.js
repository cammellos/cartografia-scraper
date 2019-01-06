import * as cheerio from 'cheerio';

const tableSelector = '#frmVstPiani\\:tblProcedimenti';

function extractIdFromLink(link) {
  const idRegex = /idPiano=(\d+)/g;
  const match = idRegex.exec(link);
  if (!match) {
    return;
  }

  return match[1];
}

function extractObject(url, $, el) {
  const cells = $(el).find('td');
  const link = cells.find('a').attr('href');
  const baseUrl = `${url
    .split('/')
    .slice(0, -1)
    .join('/')}/`;

  return {
    id: `${url}-${extractIdFromLink(link)}`,
    title: cells.eq(2).text(),
    text: [
      cells.eq(1).text(),
      cells.eq(2).text(),
      cells.eq(3).text(),
      cells.eq(4).text()
    ],
    link: `${baseUrl}${link}`
  };
}

export default function parseHTML(url, html) {
  const $ = cheerio.load(html);
  const elements = $(`${tableSelector} tbody tr`);
  const response = [];

  elements.map((i, el) => {
    const item = extractObject(url, $, el);
    if (item) {
      response.push(item);
    }
    return item;
  });
  return response;
}
