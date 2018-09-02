from datetime import datetime, timezone

def strftime(date, format):
    return date.strftime(format)

def l(t, format="%Y-%m-%d %H:%M:%S"):
    if not t.tzinfo:
        t = timezone('UTC').localize(t)
    time = t.astimezone(timezone('Asia/Tokyo'))
    return strftime(time, format)

def isoformat(date):
    return date.isoformat()
