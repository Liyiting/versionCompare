
    /*测试用例
    // v1     v2    （结果)
    "2.2.3"  "2.2.4.16" (-1)
    "2.2"    "2.2.5.6"  (-1)
    "2.2a"   "2.2.3"    (-1)
    "0.1.1a" "0.1.1"    (-1)
    "matlab r2014a"  "matlab r2014b"  (-1)
    "MATLAB R2007b"  "MATLAB R2016a"  (-1)
    "3.1.1b" "3.1.1rc"   (1)
    "2.1.6"  "2.1.6b"    (1)
    "2.1.6b" "2.1.6b2"   (-1)
    "2.1.6b2" "2.1.6b2"  (0)
    */

    function versionCompare(v1,v2){ //v1比较新时返回1,v1和v2相同是返回0,v2比较新时返回-1;
        var arr1 = v1.toLowerCase().split('.');
        var arr2 = v2.toLowerCase().split('.');
        var len1 = arr1.length;
        var len2 = arr2.length;

        if(arr1[0].indexOf("matlab")!=-1 && arr2[0].indexOf("matlab")!=-1) {  //类似MATLAB的情况
            arr1 = arr1[0].split('');
            arr2 = arr2[0].split('');
            for (var n = 8; n < arr1.length; n++) {
                if (n == arr1.length - 1) {
                    return arr1[arr1.length - 1] == "a" ? "-1" : "1";
                } else if(arr1[n]!=arr2[n]){
                    return arr1[n]>arr2[n] ? "1" : "-1";
                }
            }
        }
        //将例如 [2,1,2a] => [2,1,2,a]
        if(isNaN(arr1[len1-1])){arr1=splitString(arr1);}
        if(isNaN(arr2[len2-1])){arr2=splitString(arr2);}
        len1 = arr1.length;
        len2 = arr2.length;

        for(var i=0;i<(len1>len2?len1:len2);i++) {
            if (arr1[i] != arr2[i]) {
                if (typeof(arr1[i] && arr2[i]) == "undefined" && (!isNaN(arr1[i]) || !isNaN(arr2[i]))) {
                    //两个数组的对应位是数字和undefined
                    return typeof(arr1[i]) == "undefined" ? "-1" : "1";
                } else if (typeof(arr1[i] && arr2[i]) == "undefined" && isNaN(arr1[i]) && isNaN(arr2[i])) {
                    //两个数组的对应位是字母和undefined
                    return (typeof(arr1[i])== "undefined")? "1" : "-1";
                } else if (!isNaN(arr1[i]) && !isNaN(arr2[i])) {
                    //两个数组的对应位都是数字
                    return parseInt(arr1[i]) > parseInt(arr2[i]) ? "1" : "-1";
                } else if (isNaN(arr1[i]) && isNaN(arr2[i])) {
                    //两个数组的对应位是字母
                    var obj = {a: 0, b: 2, rc: 3};  //考虑到“alpha”、“beta”和“releasecandidate”版本
                    arr1[i] = obj[arr1[i]];
                    arr2[i] = obj[arr2[i]];
                    return arr1[i] > arr2[i] ? "1": "-1";
                } else {    //两个数组的对应位是字母和数字
                    return isNaN(arr1[i]) ? "-1" : "1";
                }
            } else if(len1==len2 &&i==len1-1){
                //两个版本号相同
                return "0";
            }
        }
    }

    function splitString(arr){
        //将版本号数组最后一位的数字和字母分开  [2,2,16b2] => [2,2,16,b,2]
        var item=arr.splice(arr.length-1,1);
        var letter=item.toString().replace(/[^a-z]+/ig,"");
        var number=item.toString().replace(/[^0-9]+/ig,",").split(',');
        arr.push(number.shift(),letter);
        if(number && number[0].length!=0){
            arr.push(number.shift());
        }
        return arr;
    }
