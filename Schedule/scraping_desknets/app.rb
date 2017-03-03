require 'nokogiri'









			html = File.read('./html.html')
			doc = Nokogiri::HTML(html)
			#p doc.xpath('//*[@id="jsch-schweekgrp"]/form/div[3]/div[3]')
			#p doc.xpath('//*[@id="jsch-schweekgrp"]/form/div[3]/div[3]/div[2]/table/tbody/tr/td[1]/div')

				schedules = []

			doc.css(".jsch-members-group-cal").each do |node|
				userId = node.xpath("./@data-target").to_s;
				p '★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★'
				#p node
				p '★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★'

				dayPlans = [];
				node.xpath("./div/div/div").each do |item|
					startTime = item.xpath("./div[1]/a/@title").to_s.slice(0..4)
					endTime = item.xpath("./div[1]/a/@title").to_s.slice(8..12)
					plan = item.xpath("./div[1]/a/text()").to_s
					dayPlans = {
						userId => {
							start: startTime,
							end: endTime,
							text: plan
						}
					}
				end

								schedules.push(dayPlans);
			end


			names = []

			doc.css(".sch-gcal-target-header").each do |node|
				userId = node.xpath("./@data-target").to_s;
			#	p '★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★'
			#	p '★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★'
				name = node.xpath("./div/a/text()").to_s;
				names.push(userId,name)

			end
			p names
			p schedules
