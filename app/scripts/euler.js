function problem1(num) {
    var sum = 0;

    for (var i = 0; i < num; i++)
    {
        if((i % 3 === 0) || (i % 5 === 0))
        {
            sum += i;
        }
    }
    return sum;
}

function problem2(){
var x = 1;
var y = 2;
var z = 0;
var sum = 0;

while (x < 4000000) {
    if (x % 2 === 0) {
        sum += x;
    }
    z = x + y;
    x = y;
    y = z;
}

return sum
}