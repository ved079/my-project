import { db } from '../src/lib/db'

const SLA_MINUTES = 30

async function seed() {
  // Clean existing data
  await db.activityLog.deleteMany()
  await db.statusChange.deleteMany()
  await db.leadNote.deleteMany()
  await db.lead.deleteMany()
  await db.teamMember.deleteMany()
  await db.client.deleteMany()

  // ── Create Clients ──
  const newmiCare = await db.client.create({
    data: { name: 'Newmi Care', industry: 'Women\'s Health', location: 'Gurgaon', slaMinutes: 30 },
  })
  const skinClinic = await db.client.create({
    data: { name: 'DermaLux Clinic', industry: 'Dermatology', location: 'Delhi', slaMinutes: 20 },
  })
  const hairClinic = await db.client.create({
    data: { name: 'HairRevive Studio', industry: 'Hair Transplant', location: 'Mumbai', slaMinutes: 15 },
  })

  // ── Create Team Members ──
  const riya = await db.teamMember.create({
    data: {
      name: 'Riya Sharma',
      email: 'riya@agency.com',
      role: 'lead_exec',
      initials: 'RS',
      clients: { connect: [{ id: newmiCare.id }, { id: hairClinic.id }] },
    },
  })
  const anil = await db.teamMember.create({
    data: {
      name: 'Anil Kapoor',
      email: 'anil@agency.com',
      role: 'lead_exec',
      initials: 'AK',
      clients: { connect: [{ id: newmiCare.id }, { id: skinClinic.id }] },
    },
  })
  const priya = await db.teamMember.create({
    data: {
      name: 'Priya Singh',
      email: 'priya@agency.com',
      role: 'lead_exec',
      initials: 'PS',
      clients: { connect: [{ id: newmiCare.id }] },
    },
  })
  const meena = await db.teamMember.create({
    data: {
      name: 'Meena Patel',
      email: 'meena@agency.com',
      role: 'lead_exec',
      initials: 'MP',
      clients: { connect: [{ id: skinClinic.id }, { id: hairClinic.id }] },
    },
  })

  // ── Create Leads (assigned to Riya mostly) ──
  const now = new Date()
  const minutesAgo = (m: number) => new Date(now.getTime() - m * 60000)
  const slaFrom = (inquiry: Date, minutes: number) => new Date(inquiry.getTime() + minutes * 60000)

  const leadData = [
    // Riya's leads — various statuses and urgency levels
    { name: 'Kavya Sharma', phone: '+91 87654 32456', phoneMasked: '+91 87XXX XX456', service: 'PCOS Management', source: 'Meta Ads', location: 'Delhi', status: 'New', client: newmiCare, inquiry: minutesAgo(12), cost: 437 },
    { name: 'Ritu Agarwal', phone: '+91 43210 98234', phoneMasked: '+91 43XXX XX234', service: 'Post-Pregnancy Care', source: 'Meta Ads', location: 'Gurgaon', status: 'New', client: newmiCare, inquiry: minutesAgo(25), cost: 380 },
    { name: 'Neha Bhatia', phone: '+91 88765 43789', phoneMasked: '+91 88XXX XX789', service: 'General Wellness', source: 'Google Ads', location: 'Noida', status: 'Contacted', client: newmiCare, inquiry: minutesAgo(180), cost: 425 },
    { name: 'Lakshmi Gupta', phone: '+91 44321 09567', phoneMasked: '+91 44XXX XX567', service: 'Fertility Consultation', source: 'Google Ads', location: 'Gurgaon', status: 'Consultation Booked', client: newmiCare, inquiry: minutesAgo(4320), cost: 510 },
    { name: 'Rashi Malhotra', phone: '+91 98765 43345', phoneMasked: '+91 98XXX XX345', service: 'Pregnancy Care', source: 'Google Ads', location: 'Delhi', status: 'Converted', client: newmiCare, inquiry: minutesAgo(11520), cost: 395 },
    { name: 'Komal Rana', phone: '+91 43210 98890', phoneMasked: '+91 43XXX XX890', service: 'Pregnancy Care', source: 'WhatsApp', location: 'Gurgaon', status: 'Converted', client: newmiCare, inquiry: minutesAgo(14400), cost: 100 },
    { name: 'Vikram Rao', phone: '+91 99123 45678', phoneMasked: '+91 99XXX XX678', service: 'Hair Transplant', source: 'Google Ads', location: 'Mumbai', status: 'New', client: hairClinic, inquiry: minutesAgo(8), cost: 520 },
    { name: 'Arjun Patel', phone: '+91 98234 56789', phoneMasked: '+91 98XXX XX789', service: 'Hair Transplant', source: 'Google Ads', location: 'Mumbai', status: 'New', client: hairClinic, inquiry: minutesAgo(3), cost: 480 },
    { name: 'Sanjay Kumar', phone: '+91 87654 12345', phoneMasked: '+91 87XXX XX345', service: 'PRP Therapy', source: 'Meta Ads', location: 'Delhi', status: 'Contacted', client: hairClinic, inquiry: minutesAgo(240), cost: 350 },
    { name: 'Deepa Nair', phone: '+91 76543 21098', phoneMasked: '+91 76XXX XX098', service: 'Beard Transplant', source: 'WhatsApp', location: 'Mumbai', status: 'Consultation Booked', client: hairClinic, inquiry: minutesAgo(2880), cost: 200 },
    { name: 'Meena Iyer', phone: '+91 65432 10987', phoneMasked: '+91 65XXX XX987', service: 'PCOS Management', source: 'Organic SEO', location: 'Gurgaon', status: 'New', client: newmiCare, inquiry: minutesAgo(35), cost: 0 },
    { name: 'Tara Desai', phone: '+91 54321 09876', phoneMasked: '+91 54XXX XX876', service: 'Hair Transplant', source: 'Practo', location: 'Mumbai', status: 'Contacted', client: hairClinic, inquiry: minutesAgo(360), cost: 316 },
    { name: 'Rohan Mehta', phone: '+91 43210 98765', phoneMasked: '+91 43XXX XX765', service: 'Hair Transplant', source: 'Google Ads', location: 'Mumbai', status: 'Lost', client: hairClinic, inquiry: minutesAgo(7200), cost: 490 },
    { name: 'Priya Deshmukh', phone: '+91 32109 87654', phoneMasked: '+91 32XXX XX654', service: 'Fertility Consultation', source: 'Meta Ads', location: 'Delhi', status: 'New', client: newmiCare, inquiry: minutesAgo(45), cost: 430 },
  ]

  for (const ld of leadData) {
    const lead = await db.lead.create({
      data: {
        name: ld.name,
        phone: ld.phone,
        phoneMasked: ld.phoneMasked,
        service: ld.service,
        source: ld.source,
        location: ld.location,
        status: ld.status,
        assignedToId: riya.id,
        clientId: ld.client.id,
        inquiryTime: ld.inquiry,
        slaDeadline: slaFrom(ld.inquiry, ld.client.slaMinutes),
        cost: ld.cost,
      },
    })

    // Create initial status change for non-New leads
    if (ld.status !== 'New') {
      await db.statusChange.create({
        data: {
          leadId: lead.id,
          teamMemberId: riya.id,
          fromStatus: 'New',
          toStatus: ld.status,
          createdAt: new Date(ld.inquiry.getTime() + 15 * 60000),
        },
      })
    }
  }

  // Also create a few leads assigned to others (Riya can see these as "team")
  const otherLeads = [
    { name: 'Ananya Reddy', phone: '+91 76543 21123', phoneMasked: '+91 76XXX XX123', service: 'Fertility Consultation', source: 'Organic SEO', location: 'Noida', status: 'Contacted', client: newmiCare, inquiry: minutesAgo(240), assignee: anil },
    { name: 'Deepika Tyagi', phone: '+91 65432 10890', phoneMasked: '+91 65XXX XX890', service: 'Menopause Support', source: 'Google Ads', location: 'Gurgaon', status: 'New', client: newmiCare, inquiry: minutesAgo(480), assignee: priya },
    { name: 'Sneha Patel', phone: '+91 54321 09567', phoneMasked: '+91 54XXX XX567', service: 'General Wellness', source: 'Practo', location: 'Delhi', status: 'Consultation Booked', client: newmiCare, inquiry: minutesAgo(1440), assignee: meena },
    { name: 'Meera Krishnan', phone: '+91 32109 87901', phoneMasked: '+91 32XXX XX901', service: 'PCOS Management', source: 'WhatsApp', location: 'Noida', status: 'Converted', client: newmiCare, inquiry: minutesAgo(4320), assignee: meena },
    { name: 'Swati Chauhan', phone: '+91 99876 54012', phoneMasked: '+91 99XXX XX012', service: 'Menopause Support', source: 'Organic SEO', location: 'Gurgaon', status: 'Consultation Booked', client: newmiCare, inquiry: minutesAgo(4320), assignee: priya },
  ]

  for (const ld of otherLeads) {
    await db.lead.create({
      data: {
        name: ld.name,
        phone: ld.phone,
        phoneMasked: ld.phoneMasked,
        service: ld.service,
        source: ld.source,
        location: ld.location,
        status: ld.status,
        assignedToId: ld.assignee.id,
        clientId: ld.client.id,
        inquiryTime: ld.inquiry,
        slaDeadline: slaFrom(ld.inquiry, ld.client.slaMinutes),
        cost: 0,
      },
    })
  }

  // ── Create Activity Logs for Riya ──
  const riyaLeads = await db.lead.findMany({ where: { assignedToId: riya.id } })

  const activityEntries = [
    { action: 'status_change', detail: 'Updated Kavya Sharma to "Contacted"', minutesAgo: 5 },
    { action: 'note_added', detail: 'Added note on Neha Bhatia: "Called, asked to call back at 3pm"', minutesAgo: 18 },
    { action: 'lead_assigned', detail: 'New lead assigned: Vikram Rao (Hair Transplant)', minutesAgo: 22 },
    { action: 'lead_assigned', detail: 'New lead assigned: Arjun Patel (Hair Transplant)', minutesAgo: 25 },
    { action: 'status_change', detail: 'Updated Sanjay Kumar to "Contacted"', minutesAgo: 45 },
    { action: 'note_added', detail: 'Added note on Deepa Nair: "Consultation confirmed for Thursday"', minutesAgo: 60 },
    { action: 'flag_added', detail: 'Flagged Rohan Mehta as "Lost"', minutesAgo: 90 },
    { action: 'status_change', detail: 'Updated Tara Desai to "Contacted"', minutesAgo: 120 },
    { action: 'lead_assigned', detail: 'New lead assigned: Meena Iyer (PCOS Management)', minutesAgo: 180 },
    { action: 'status_change', detail: 'Updated Lakshmi Gupta to "Consultation Booked"', minutesAgo: 240 },
    { action: 'note_added', detail: 'Added note on Rashi Malhotra: "Patient converted, booking confirmed"', minutesAgo: 300 },
    { action: 'status_change', detail: 'Updated Rashi Malhotra to "Converted" 🎉', minutesAgo: 320 },
    { action: 'lead_assigned', detail: 'New lead assigned: Priya Deshmukh (Fertility Consultation)', minutesAgo: 400 },
  ]

  for (const act of activityEntries) {
    const matchingLead = riyaLeads.find(l => act.detail.includes(l.name))
    await db.activityLog.create({
      data: {
        teamMemberId: riya.id,
        leadId: matchingLead?.id || null,
        action: act.action,
        detail: act.detail,
        createdAt: minutesAgo(act.minutesAgo),
      },
    })
  }

  // Add some notes for Riya's leads
  const notesData = [
    { leadName: 'Kavya Sharma', content: 'Patient interested in PCOS package. Needs callback with pricing.' },
    { leadName: 'Neha Bhatia', content: 'Called, asked to call back at 3pm. Prefers WhatsApp communication.' },
    { leadName: 'Lakshmi Gupta', content: 'Consultation confirmed for Thursday 2pm at Gurgaon clinic.' },
    { leadName: 'Rashi Malhotra', content: 'Patient converted! Package: Pregnancy Care Premium ₹28,000.' },
    { leadName: 'Vikram Rao', content: 'Urgent — looking for transplant within 2 weeks.' },
  ]

  for (const nd of notesData) {
    const lead = riyaLeads.find(l => l.name === nd.leadName)
    if (lead) {
      await db.leadNote.create({
        data: {
          leadId: lead.id,
          teamMemberId: riya.id,
          content: nd.content,
          createdAt: minutesAgo(Math.floor(Math.random() * 300) + 10),
        },
      })
    }
  }

  console.log('✅ Seed complete!')
  console.log(`  Clients: ${await db.client.count()}`)
  console.log(`  Team Members: ${await db.teamMember.count()}`)
  console.log(`  Leads: ${await db.lead.count()}`)
  console.log(`  Activity Logs: ${await db.activityLog.count()}`)
  console.log(`  Notes: ${await db.leadNote.count()}`)
}

seed().catch(e => { console.error(e); process.exit(1) })
