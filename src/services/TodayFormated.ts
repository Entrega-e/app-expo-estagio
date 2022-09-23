const timeElapsed = Date.now();
const today = new Date(timeElapsed);

var i,mm,dd,aaaa, formatedDate: string
i = today.getMonth() + 1
mm = today.getMonth() > 10 ? i : '0' + i 
dd = today.getDate() > 10 ? today.getDate() : '0' + today.getDate()
aaaa = today.getFullYear()

formatedDate = aaaa + '-' + mm + '-' + dd + 'T03:00:00.000Z'

export default formatedDate