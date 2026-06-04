export async function GET(req) {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    const referer = req.headers.get('referer') || 'unknown';
    const cookies = req.headers.get('cookie') || 'none';
    const timestamp = new Date().toISOString();

    const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const deviceType = isMobile ? 'Mobile' : 'Desktop';
    
    let browser = 'Unknown';
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';

    const logEntry = {
        timestamp,
        ip,
        userAgent,
        browser,
        deviceType,
        referer,
        cookies,
        headers: Object.fromEntries(req.headers)
    };

    console.log("=== IP + DEVICE + COOKIES LOGGED ===");
    console.log(JSON.stringify(logEntry, null, 2));

    const transparentGif = Buffer.from([0x47,0x49,0x46,0x38,0x39,0x61,0x01,0x00,0x01,0x00,0x80,0x00,0x00,0xff,0xff,0xff,0x00,0x00,0x00,0x21,0xf9,0x04,0x01,0x00,0x00,0x00,0x00,0x2c,0x00,0x00,0x00,0x00,0x01,0x00,0x01,0x00,0x00,0x02,0x02,0x44,0x01,0x00,0x3b]);

    return new Response(transparentGif, {
        headers: {
            'Content-Type': 'image/gif',
            'Cache-Control': 'no-store, no-cache'
        }
    });
}
