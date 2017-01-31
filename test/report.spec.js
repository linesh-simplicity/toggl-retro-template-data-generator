import { describe, beforeEach, it } from "mocha"
import { expect } from 'chai'
import { Report } from '../src/report'

describe('report.js', () => {
   let report
   let since = '2017-01-14', until = '2017-01-26'
   let reportResponse

   let mockReportResponse = () => {
      return [
         {
            id: 19673694, title: { client: 'work' }, time: 142375304, 
            items: [
               { title: { project: 'regular-meetings' }, time: 18327000 },
               { title: { project: 'workshops' }, time: 9750000 }
            ]
         },
         {
            id: 19673695, title: { client: 'tech-programming' }, time: 51178000,
            items: [
               { title: { client: 'peak-development' }, time: 38312000 },
               { title: { client: 'project-refactor'}, time: 11571000 }
            ]
         },
         {
            id: 19673693, title: { client: 'basiclife' }, time: 486582000,
            items: [
               { title: { client: 'eating' }, time: 44589000 },
               { title: { client: 'sleeping' }, time: 249265000 },
               { title: { client: 'shower' }, time: 18523000 }
            ]
         }

      ]
   }

   beforeEach(() => {
      report = new Report()
      reportResponse = mockReportResponse()
   })

   it('should get correct summary data when method getSummaryData() is called', () => {
      let summary = report.getSummaryData(1006076304, since, until);
      
      expect(summary.totalGrand).to.equal('279h 28min')
      expect(summary.totalDays).to.equal(12)
      expect(summary.grandPercentage).to.equal('97.04%')
      expect(summary.grandHoursPerDay).to.equal('23h 18min')
   })

   it('should get correct client data when method getClientsData() is called', () => {
      let client = report.getClientData(reportResponse, since, until);
      
      expect(client.length).to.equal(3)
      expect(client[0]).to.deep.equal({
         client: 'work', time: '39h 33min',
         percentage: '13.73%', hoursPerDay: '3h 18min'
      })
      expect(client[1]).to.deep.equal({ 
         client: 'tech-programming', time: '14h 13min',
         percentage: '4.94%', hoursPerDay: '1h 12min' 
      })
      expect(client[2]).to.deep.equal({ 
         client: 'basiclife', time: '135h 10min',
         percentage: '46.93%', hoursPerDay: '11h 16min' 
      })
   })
   
   it('should get correct projects data when method getProjectsData() is called', () => {
      let projects = report.getProjectsData(reportResponse, since, until);
      
      console.log(projects[0])
      expect(projects.length).to.equal(3)
      expect(projects[0]).to.deep.equal({ 
         client: 'work', time: '39h 33min',
         projects: [{ 
            project: 'regular-meetings', time: '5h 6min',
            hoursPerDay: '0h 26min', percentage: '12.87%'
         }, { 
            project: 'workshops', time: '2h 43min',
            hoursPerDay: '0h 14min', percentage: '6.85%'
         }] 
      })
   })
})