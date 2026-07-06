import { describe, expect, it } from 'vitest'
import { branchByName, branches, commits, sortedCommits } from './commits'
import { projectById, projects } from './projects'

describe('log data integrity', () => {
  it('commit ids are unique', () => {
    const ids = commits.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every commit belongs to a defined branch', () => {
    commits.forEach((commit) => {
      expect(branchByName(commit.branch), `branch '${commit.branch}' on '${commit.id}'`).toBeDefined()
    })
  })

  it('every projectId resolves to a project', () => {
    commits.forEach((commit) => {
      if (commit.projectId) {
        expect(projectById(commit.projectId), `project '${commit.projectId}' on '${commit.id}'`).toBeDefined()
      }
    })
  })

  it('every commit date is a full ISO date', () => {
    commits.forEach((commit) => {
      expect(commit.date, `date on '${commit.id}'`).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(Number.isNaN(Date.parse(commit.date)), `date on '${commit.id}' parses`).toBe(false)
    })
  })

  it('sortedCommits is newest first', () => {
    for (let i = 1; i < sortedCommits.length; i++) {
      expect(sortedCommits[i - 1]!.date >= sortedCommits[i]!.date).toBe(true)
    }
  })

  it('every branch has at least one commit', () => {
    branches.forEach((branch) => {
      expect(
        commits.some((c) => c.branch === branch.name),
        `branch '${branch.name}' has commits`
      ).toBe(true)
    })
  })

  it('projects have recruiter-legible content and working link shapes', () => {
    projects.forEach((project) => {
      expect(project.oneLiner.length, `${project.id} oneLiner`).toBeGreaterThan(20)
      expect(project.whatItShows.length, `${project.id} whatItShows`).toBeGreaterThan(20)
      expect(project.stack.length, `${project.id} stack`).toBeGreaterThan(0)
      expect(project.preview, `${project.id} preview`).toBeDefined()
      project.links.forEach((link) => {
        expect(link.href, `${project.id} link '${link.label}'`).toMatch(/^https:\/\//)
      })
      project.facts?.forEach((fact) => {
        expect(fact.text.length, `${project.id} fact text`).toBeGreaterThan(10)
        expect(fact.source.label.length, `${project.id} fact source label`).toBeGreaterThan(2)
        expect(fact.source.href, `${project.id} fact source href`).toMatch(/^https:\/\//)
        expect(fact.verifiedAt, `${project.id} fact verifiedAt`).toMatch(/^\d{4}-\d{2}-\d{2}$/)
        expect(Number.isNaN(Date.parse(fact.verifiedAt)), `${project.id} fact verifiedAt parses`).toBe(false)
      })
    })
  })

  it('the Staff promotion has expandable recruiter detail', () => {
    const staff = commits.find((commit) => commit.id === 'staff-engineer')
    expect(staff?.body?.length).toBeGreaterThan(80)
  })
})
