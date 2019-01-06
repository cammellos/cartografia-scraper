import * as fs from 'fs';
import parseHTML from '../../app/services/cartografia';

const content = fs.readFileSync('./test/resources/cartografia.html');
const url =
  'https://www.cartografia.regione.lombardia.it/sivas/jsp/procedimenti/procedimentiInCorsoVa.jsf';
const expectedObject = {
  title: 'Piano di Gestione delle Acque del Bacino Distrettuale del Po - PdGPo',
  text: [
    'AUTORITÀ DI BACINO DEL FIUME PO',
    'Piano di Gestione delle Acque del Bacino Distrettuale del Po - PdGPo',
    'PdGPo2015 - Piano di gestione delle acque del bacino distrettuale del fiume Po - riesame e aggiornamento 2015',
    '28/11/2014'
  ],
  link:
    'https://www.cartografia.regione.lombardia.it/sivas/jsp/procedimenti/schedaProcedimento.jsf;jsessionid=155F871D2EA85066C2A81398E14BCF73.tomcat2?idPiano=81181&idTipoProcedimento=1',
  id:
    'https://www.cartografia.regione.lombardia.it/sivas/jsp/procedimenti/procedimentiInCorsoVa.jsf-81181'
};

describe('parseHTML', () => {
  describe('no content', () => {
    it('returns an empty array', () => {
      expect(parseHTML(url, '')).toEqual([]);
    });
  });

  describe('with content', () => {
    const expected = parseHTML(url, content);
    it('returns the right number of elements', () => {
      expect(expected.length).toEqual(590);
    });

    it('returns the right title', () => {
      expect(expected[0].title).toEqual(expectedObject.title);
    });

    it('returns the right text', () => {
      expect(expected[0].text).toEqual(expectedObject.text);
    });

    it('returns the right link', () => {
      expect(expected[0].link).toEqual(expectedObject.link);
    });

    it('returns the right id', () => {
      expect(expected[0].id).toEqual(expectedObject.id);
    });
  });
});
