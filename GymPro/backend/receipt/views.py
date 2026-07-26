from django.shortcuts import render

from io import BytesIO

from django.http import FileResponse
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer

from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.colors import HexColor
from reportlab.platypus import Image

import os
from django.conf import settings

from members.models import Member

from settings_app.models import GymSetting


class ReceiptAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, member_id):

        setting = get_object_or_404(GymSetting, trainer=request.user)
        member = get_object_or_404(Member, pk = member_id, trainer = request.user)
        membership = member.memberships.order_by("-payment_date").first()

        buffer = BytesIO()

        doc = SimpleDocTemplate(buffer)
        styles = getSampleStyleSheet()
        elements = []

        # logo = os.path.join(settings.MEDIA_ROOT, "gym_logo.png")

        if setting.logo and os.path.exists(setting.logo.path):
            img = Image(setting.logo.path)
            img.drawHeight = 80
            img.drawWidth = 80
            img.hAlign = "CENTER"
            elements.append(img)
            print("logo added")

        # from PIL import Image as PILImage

        # pil = PILImage.open(setting.logo.path)
        # print(pil.size)

        # img = Image(setting.logo.path)

        # elements.append(Paragraph("<b> <font size=20> GymPro </font> </b>", styles["Title"]))

        title = styles["Title"]
        title.alignment = TA_CENTER
        title.textColor = HexColor("#0d6efd")
        elements.append(Paragraph(f"<b> {setting.gym_name} </b>", title))
        elements.append(Paragraph(setting.address, styles["Normal"]))
        elements.append(Paragraph(setting.phone, styles["Normal"]))
        elements.append(Paragraph(setting.email, styles["Normal"]))
        elements.append(Spacer(1, 20))

        # elements.append(Paragraph("Membership Payment Receipt", styles["Heading2"]))

        heading = styles["Heading2"]
        heading.alignment = TA_CENTER
        elements.append(Paragraph("<b> MEMBERSHIP PAYMENT RECEIPT </b>", heading))
        elements.append(Spacer(1, 15))


        # elements.append(Spacer(1,20))

        data = [

            ["Membership ID", member.membership_id],
            ["Member Name", member.member_name],
            ["Phone", member.phone],
            ["Email", member.email],
            ["Plan", f"{membership.membership_duration} Month(s)"],
            ["Payment Date", str(membership.payment_date)],
            ["Expiry Date", str(membership.expiry_date)],
            ["Amount", f"₹ {membership.amount_paid}"],
            ["Payment Type", membership.payment_type],
        ]


        receipt_no = f"REC-{membership.id:05d}"
        elements.append(Paragraph(f"<b> Receipt No: </b> {receipt_no}", styles["Normal"]))
        elements.append(Paragraph(f"<b> Receipt Date: </b> {membership.payment_date}", styles["Normal"]))
        elements.append(Spacer(1, 15))


        table = Table(data, colWidths=[180, 250])

        table.setStyle(TableStyle([

            ("BACKGROUND",(0,0),(0,-1),HexColor("#0d6efd")),
            ("TEXTCOLOR",(0,0),(0,-1),colors.white),
            ("GRID",(0,0),(-1,-1),1,colors.grey),
            ("BACKGROUND",(1,0),(1,-1),colors.beige),
            ("FONTNAME",(0,0),(-1,-1),"Helvetica"),
            ("BOTTOMPADDING",(0,0),(-1,-1),10),
            ("TOPPADDING",(0,0),(-1,-1),10),

        ]))

        elements.append(table)
        elements.append(Spacer(1, 40))

        footer = styles["Normal"]
        footer.alignment = TA_CENTER
        elements.append(Paragraph("<b> Payment Received Successfully </b>", footer))
        elements.append(Paragraph(f"<b> Thank you for choosing {setting.gym_name} </b>", footer))
        elements.append(Spacer(1, 40))
        # elements.append(Paragraph("Authorized Signature", styles["Normal"]))

        doc.build(elements)

        buffer.seek(0)

        return FileResponse(buffer, as_attachment=True, filename=f"{member.membership_id}.pdf")





