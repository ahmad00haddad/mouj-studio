import re

with open('src/routes/works.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

maps_reviews = '''  { quote: "Amazing studio! Motaz is an absolute genius when it comes to mixing and sound design. Highly recommend for any serious project.", name: "Local Artist", role: "Google Maps Review" },
  { quote: "One of the best audio facilities in Amman. Very professional, comfortable environment, and world-class gear.", name: "Studio Client", role: "Google Maps Review" },
  { quote: "Great experience recording our vocals here. The acoustic treatment is top-notch and the final mix was pristine.", name: "Band Member", role: "Google Maps Review" },
'''

content = content.replace('const fallbackTestimonials = [', 'const fallbackTestimonials = [\n' + maps_reviews)

with open('src/routes/works.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print(content.find("Google Maps Review"))
