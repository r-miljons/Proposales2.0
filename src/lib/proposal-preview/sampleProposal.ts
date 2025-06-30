// This file provides a function that returns the sample proposal HTML as a string.

export function getSampleProposalHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Proposal — Trip to Georgian Mountains</title>
  <meta name="viewport" content="width=794">
</head>
<body style="background:#fff;color:#111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin:0;padding:0;">
  <div style="
    width:794px;
    margin:0 auto;
    box-sizing:border-box;
    padding:40px 32px 32px 32px;
    display:flex;
    flex-direction:column;
    gap:38px;
    min-height:100vh;
  ">
    <!-- Header grid -->
    <div style="
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:32px;
      font-size:1.1rem;
      text-transform:uppercase;
      letter-spacing:0.03em;
    ">
      <div>
        <span style="color:#888;font-weight:500;">Prepared by:</span><br>
        <span style="color:#111;font-weight:700;">Proposales AB</span>
      </div>
      <div>
        <span style="color:#888;font-weight:500;">Prepared for:</span><br>
        <span style="color:#111;font-weight:700;">Client Name</span>
      </div>
    </div>

    <!-- Title & intro -->
    <div>
      <div style="
        font-size:2.5rem;
        font-weight:700;
        letter-spacing:-0.015em;
        margin-bottom:8px;
        line-height:1.1;
      ">
        Trip To Georgian Mountains
      </div>
      <div style="
        font-size:1.1rem;
        color:#444;
        margin-bottom:16px;
        max-width:70%;
        line-height:1.5;
      ">
        Team building trip to the Georgian Caucasus mountains. A unique adventure for your team, combining nature, culture, and collaboration.
      </div>
    </div>

    <!-- Hero image -->
    <img
      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
      alt="Caucasus mountains"
      style="
        width:100%;
        height:280px;
        object-fit:cover;
        margin:0 0 16px 0;
        border-radius:10px;
        box-shadow:0 3px 16px rgba(0,0,0,0.11);
      "
    >

    <!-- Sections (vertical stack) -->
    <div style="
      display:flex;
      flex-direction:column;
      gap:32px;
      margin-top:48px;
    ">
      <div style="
        background:#f7f7f7;
        border-radius:10px;
        padding:21px;
        display:flex;
        flex-direction:column;
        gap:8px;
        box-shadow:0 2px 6px rgba(0,0,0,0.04);
        min-height:240px;
      ">
        <div style="
          font-size:1.3rem;
          font-weight:600;
          letter-spacing:0.01em;
          margin-bottom:8px;
          color:#222;
        ">1. Gudauri Arrival & Welcome</div>
        <div style="
          font-size:1rem;
          color:#353535;
          flex-grow:1;
          margin-bottom:8px;
          line-height:1.5;
        ">
          Arrive in Tbilisi and transfer by private coach through the scenic Georgian Military Road to Gudauri. Welcome lunch and a team kickoff with local guides.
        </div>
        <div style="
          display:flex;
          gap:8px;
          margin-top:8px;
        ">
          <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80" alt="Gudauri landscape"
            style="width:100%;height:130px;object-fit:cover;border-radius:6px;background:#ccc;flex:2 1 0;">
          
        </div>
      </div>
      <div style="
        background:#f7f7f7;
        border-radius:10px;
        padding:21px;
        display:flex;
        flex-direction:column;
        gap:8px;
        box-shadow:0 2px 6px rgba(0,0,0,0.04);
        min-height:240px;
      ">
        <div style="
          font-size:1.3rem;
          font-weight:600;
          letter-spacing:0.01em;
          margin-bottom:8px;
          color:#222;
        ">2. Mountain Challenge</div>
        <div style="
          font-size:1rem;
          color:#353535;
          flex-grow:1;
          margin-bottom:8px;
          line-height:1.5;
        ">
          Snowshoe trek and team photo challenge in the stunning Caucasus peaks. Leadership workshop in the lodge after lunch.
        </div>
        <div style="
          display:flex;
          gap:8px;
          margin-top:8px;
        ">
          <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80" alt="Snowshoe adventure"
            style="width:100%;height:90px;object-fit:cover;border-radius:6px;background:#ccc;flex:1 1 0;">
        </div>
      </div>
      <div style="
        background:#f7f7f7;
        border-radius:10px;
        padding:21px;
        display:flex;
        flex-direction:column;
        gap:8px;
        box-shadow:0 2px 6px rgba(0,0,0,0.04);
        min-height:240px;
      ">
        <div style="
          font-size:1.3rem;
          font-weight:600;
          letter-spacing:0.01em;
          margin-bottom:8px;
          color:#222;
        ">3. Local Culture & Celebration</div>
        <div style="
          font-size:1rem;
          color:#353535;
          flex-grow:1;
          margin-bottom:8px;
          line-height:1.5;
        ">
          Experience a Georgian 'supra' feast, local wines, polyphonic choir, and folk traditions for an unforgettable night.
        </div>
        <div style="
          display:flex;
          gap:8px;
          margin-top:8px;
        ">
          <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80" alt="Georgian supra"
            style="width:100%;height:90px;object-fit:cover;border-radius:6px;background:#ccc;flex:1 1 0;">
        </div>
      </div>
    </div>
  </div>
</body>
</html>

`;
}
