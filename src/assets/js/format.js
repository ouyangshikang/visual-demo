export function format (fmt, times) {
    let date = times !== undefined
        ? new Date(parseInt(times))
        : new Date();
    const _time = {
        'Y+': date.getFullYear(),
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (var i in _time) {
        var reg = new RegExp('' + i + '', 'g');
        if (reg.test(fmt)) {
            fmt = fmt.replace(reg, (_time[i] + '').length === 1 ? ('00' + _time[i]).substr(-2) : _time[i]);
        }
    }
    return fmt;
}
