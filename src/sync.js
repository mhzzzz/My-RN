/**
 * Created by WangZH on 2017/5/23.
 */

const api = 'https://api.douban.com/v2/movie/subject';
const sync = {
  movie(params){
    let {id, resolve, reject, } = params;
    fetch(`${api}/${id}`)
      .then(response => response.text())
      .then(textData => {
        const json = JSON.parse(textData);
        if(json ){
          storage.save({
            key:'movie',
            id:id,
            data:json,
          });
          resolve && resolve(json);
        }else{
          reject && reject(new Error('data parse error'));
        }
      }).catch(err => {
      console.warn(err);
      reject && reject(err);
    });
  }
};

module.exports = sync;